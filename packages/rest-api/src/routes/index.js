import express from 'express';
import userRoutes from './user.routes';

const app = express();

const routes = () => {
  app.use('/user', userRoutes());

  return app;
};

export default routes;
