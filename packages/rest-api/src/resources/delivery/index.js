import { deliveryModel } from './delivery.repository';
import { findUser, decodeToken } from '../user';

const createDelivery = async ({ token, delivery }) => {
  const { email } = decodeToken(token);
  const user = await findUser({ email });
  const createdDelivery = await deliveryModel.create({
    user,
    ...delivery,
  });

  return createdDelivery;
};

const findUserDeliveries = async ({ token }) => {
  const { email } = decodeToken(token);
  const user = await findUser({ email });
  const userDeliveries = await deliveryModel.find({ user });
  return userDeliveries;
};

const findDeliveries = async () => {
  const userDeliveries = await deliveryModel.find();
  return userDeliveries;
};

export {
  createDelivery,
  findDeliveries,
  findUserDeliveries,
};
