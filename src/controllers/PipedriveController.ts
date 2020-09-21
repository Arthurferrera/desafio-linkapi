import { Request, Response } from 'express';

import PipedriveService from '../services/PipedriveService';
import BlingService from "../services/BlingService";
import OrderService from "../services/OrderService";
import { Order } from '../models/Order';

class PipedriveController {
  // Method that searches for items with the status 'Won' in Pipedrive, 
  // sends them to Bling and saves them in the database
  async index(req: Request, res: Response) {
    const deals = await PipedriveService.getWonsPipeDrive();

    // If there are no orders marked as won, returns status 204
    if (!deals) {
      return res.status(204);
    }

    deals.forEach(async deal => {
      // Calling method that organizes the data for the request
      BlingService.castOrder(deal);
      // Calling method that saves the data in the database
      OrderService.saveOrder(deal);
    });

    return res.status(201).json({Message: "Orders placed on the Bling platform"});
  }

  // Returns all orders entered in Bling
  async show(req: Request, res: Response) {
    const orders = await Order.find();
    return res.json(orders);
  }
}

export default PipedriveController;