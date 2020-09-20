import express from 'express';

import PipedriveController from './controllers/PipedriveController';

const routes = express.Router();

const pipedriveController = new PipedriveController();

routes.get("/", (req, res) => res.status(404).json({ message: 'route not used' }));

routes.get('/integration', pipedriveController.index)
routes.get('/orders', pipedriveController.show)

export default routes;