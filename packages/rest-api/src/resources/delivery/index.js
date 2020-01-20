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

const deleteDeliveries = ({ token }) => {
  const { email } = decodeToken(token);
  if (email) {
    return deliveryModel.remove({});
  }
  throw new Error('You must be authenticated');
};

const deleteUserDeliveryById = async ({ id, token }) => {
  const { email } = decodeToken(token);
  const user = await findUser({ email });
  const deleteRes = await deliveryModel.findOneAndDelete({ $and: [{ user }, { _id: id }] });
  return deleteRes;
};


export {
  createDelivery,
  deleteDeliveries,
  deleteUserDeliveryById,
  findDeliveries,
  findUserDeliveries,
};
