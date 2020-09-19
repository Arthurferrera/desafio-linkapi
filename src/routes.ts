import express from 'express';

const routes = express.Router();

routes.get("/", (req, res) => res.status(404).json({ message: 'route not used' }));

routes.get('/integration', (req, res) => {
  res.json({ok: true})
})

export default routes;