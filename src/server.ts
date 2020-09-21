import express from 'express';
import cors from "cors";
import mongoose from 'mongoose';

import routes from './routes';

// Connection to the database
mongoose.connect(`${process.env.MONGO_CONNECTION}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
},(msg) => {
  if (msg) {
    console.error('Error connection', msg);  
  }  
});

const app = express();

app.use(cors())
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT);