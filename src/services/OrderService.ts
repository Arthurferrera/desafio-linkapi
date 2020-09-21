import { Deal } from "../interfaces/PipedriveInterface";
import { Order } from '../models/Order';

class OrderService {
  async saveOrder(deal: Deal) {
    // Checking if this record already exists in the collection, 
    // only insert it if it does not exist
    const dateFind = new Date(deal.update_time);
    const order = await Order.findOne({name: deal.title, date: dateFind});

    if (!order) {
      // Inserting the record
      await new Order({
        name: deal.title,
        clientName: deal.person_name,
        date: deal.update_time,
        value: deal.value,
        currency: deal.currency
      }).save();
    }
  }
}

export default new OrderService();