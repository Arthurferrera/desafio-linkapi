import { Request, Response } from 'express';

import PipedriveService from '../services/PipedriveService';
import blingService from "../services/BlingService";

import { Order } from '../models/Order';
import HttpError from '../utils/HttpError';
import { PipedriveApiReturn, Deal } from '../interfaces/PipedriveInterface'

class PipedriveController {

  async index(req: Request, res: Response) {
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

      await new Order({
        name: deal.title,
        clientName: deal.person_name,
        date: deal.update_time,
        value: deal.value,
        currency: deal.currency
      }).save();
    });

    return res.status(201).json({Message: "Pedidos inseridos na plataforma Bling", erro});
  }

  async show() {
    return await Order.find({}).sort({ date: -1 });
  }
}

export default PipedriveController;