import { Deal } from "../interfaces/PipedriveInterface";
import { Order } from '../models/Order';

class OrderService {
  async saveOrder(deal: Deal){
    await new Order({
      name: deal.title,
      clientName: deal.person_name,
      date: deal.update_time,
      value: deal.value,
      currency: deal.currency
    }).save();
  }
}

export default new OrderService();