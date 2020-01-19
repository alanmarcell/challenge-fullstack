import express from 'express';
import userRoutes from './user.routes';
import deliveryRoutes from './delivery.routes';

const app = express();

const routes = () => {
  app.use('/', deliveryRoutes());
  app.use('/user', userRoutes());

  return app;
};

export default routes;
