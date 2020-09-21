import { Deal } from "../interfaces/PipedriveInterface";
import { Order } from '../models/Order';

class OrderService {
  async saveOrder(deal: Deal){
    console.log(deal);
    
    const dateFind = new Date(deal.update_time);
    const order = await Order.findOne({name: deal.title, date: dateFind});

    if (!order) {
      await new Order({
        name: deal.title,
        clientName: deal.person_name,
        date: deal.update_time,
        value: deal.value,
        currency: deal.currency
      }).save();
    }
    console.log(order);
    
    
    
    
  }
}

export default new OrderService();