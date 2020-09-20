import { Request, Response } from 'express';

import PipedriveService from '../services/PipedriveService';
import blingService from "../services/BlingService";
// import OrderService from "../services/OrderService";
import { PipedriveApiReturn, Deal } from '../interfaces/PipedriveInterface'

import Order from '../models/Order';
import HttpError from '../utils/HttpError';

interface deals {
  id: number,
  title: String,
  status: String,
  value: String,
  won_time: Date
}

class PipedriveController {

  async index(req: Request, res: Response) {
    console.log(`${process.env.MONGO_CONNECTION}`);
    
    let erro = false;
    let erroMsg;

    const {data, status} = await PipedriveService.get<PipedriveApiReturn>('deals', {
      params: {
        status: 'won',
        api_token: process.env.PIPEDRIVE_KEY
      }
    });

    if (status <= 199 || status >= 300) {
      throw new HttpError(500, 'An error occurred while trying to get wons from the Pipedrive API');
    }

    const deals = await data.data.map(deal => ({
      id: deal.id,
      title: deal.title,
      person_name: deal.person_name,
      value: deal.value,
      currency: deal.currency,
      update_time: deal.update_time,
      status: deal.status
    })) as Deal[];

    deals.forEach(async deal => {
      await blingService.createRequest({
        clientName: deal.person_name,
        code: deal.id,
        description: deal.title,
        value: deal.value
      }).catch(error => {
        erro = true;
        erroMsg = error
      });
      // OrderService.createOrder(deal).catch
    })
    
    if (erro) {
      return res.status(100).json({error: erroMsg});
    } else {
      return res.status(201).json({Message: "Pedidos inseridos na plataforma Bling", erro});
    }
  }
}

export default PipedriveController;