import express from 'express';
import cors from "cors";
import mongoose from 'mongoose';

import routes from './routes';

mongoose.connect(`${process.env.MONGO_CONNECTION}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
},(msg) => {
  console.log('Conexão', msg);
});

const app = express();

app.use(cors())
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT);