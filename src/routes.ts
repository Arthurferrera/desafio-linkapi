import express from 'express';

import PipedriveController from './controllers/PipedriveController';

const routes = express.Router();

const pipedriveController = new PipedriveController();

routes.get("/", (req, res) => res.status(404).json({ message: 'route not used' }));

// Route that integrates Pipedrive and Bling 
// and also saves data in the database
routes.post('/integration', pipedriveController.index)
// Route that fetches all data registered in the database
routes.get('/orders', pipedriveController.show)

export default routes;