import axios from 'axios';

const getToken = () => localStorage.getItem('user-token');

const generateUpdatedAuth = () => ({
  headers: {
    Authorization: getToken(),
    'Content-Type': 'application/json',
  },
});

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

const createUserDatasource = (createUserParams) => instance.post('/user/create', createUserParams, generateUpdatedAuth());
const loginDatasource = (loginParams) => instance.post('/user/auth', loginParams, generateUpdatedAuth());
const deliveriesDatasource = () => instance.get('/deliveries', generateUpdatedAuth());
const resetDeliveriesDatasource = () => instance.delete('/deliveries', generateUpdatedAuth());
const createDeliveryDatasource = (createDeliveryParams) => instance.post('/deliveries', createDeliveryParams, generateUpdatedAuth());

export {
  createUserDatasource,
  createDeliveryDatasource,
  deliveriesDatasource,
  loginDatasource,
  resetDeliveriesDatasource,
};
