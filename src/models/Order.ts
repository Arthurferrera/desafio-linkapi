import { Schema } from 'mongoose';

const OrderSchema = new Schema({
  title: { type: String, required: true },
  status: { type: String, required: true },
  value: { type: Number, required: true },
  won_time: { type: Date, required: true }
});

export default OrderSchema;