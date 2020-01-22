import express from 'express';
import {
  createDelivery,
  findDeliveries,
  findUserDeliveries,
  deleteUserDeliveryById,
  deleteDeliveries,
} from '../resources/delivery';

const router = express.Router();

const errorHandler = (res, error) => res.status(500).json({ message: error.message });

const deliveryRoutes = () => {
  router.post('/deliveries', async (req, res, _next) => {
    try {
      const token = req.headers.authorization;
      const delivery = req.body;
      const createdDelivery = await createDelivery({ token, delivery });

      res.json({ createdDelivery });
    } catch (error) {
      errorHandler(res, error);
    }
  });

  router.get('/user-deliveries', async (req, res, _next) => {
    try {
      const token = req.headers.authorization;
      const userDeliveries = await findUserDeliveries({ token });

      res.json({ userDeliveries });
    } catch (error) {
      errorHandler(res, error);
    }
  });


  router.get('/deliveries', async (req, res, _next) => {
    try {
      const deliveries = await findDeliveries();

      res.json({ deliveries });
    } catch (error) {
      errorHandler(res, error);
    }
  });

  router.delete('/deliveries', async (req, res, _next) => {
    try {
      const token = req.headers.authorization;
      const deliveries = await deleteDeliveries({ token });

      res.json({ deliveries });
    } catch (error) {
      errorHandler(res, error);
    }
  });

  router.delete('/user-delivery', async (req, res, _next) => {
    try {
      const token = req.headers.authorization;
      const { id } = req.body;
      const deliveries = await deleteUserDeliveryById({ id, token });

      res.json({ deliveries });
    } catch (error) {
      errorHandler(res, error);
    }
  });


  return router;
};

export default deliveryRoutes;
