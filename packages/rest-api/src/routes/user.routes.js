import express from 'express';
import { createUser, authenticateUser } from '../resources/user';

const router = express.Router();

const userRoutes = () => {
  router.post('/create', async (req, res, next) => {
    try {
      const user = req.body;
      const token = await createUser(user);

      res.json({ token });
    } catch (error) {
      next(error);
    }
  });

  router.post('/auth', async (req, res, next) => {
    const credentials = req.body;
    try {
      const token = await authenticateUser(credentials);

      res.json({ token });
    } catch (error) {
      next(error);
    }
  });

  return router;
};

export default userRoutes;
