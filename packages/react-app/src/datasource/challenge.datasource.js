import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.API_URL,
  headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem('user-token') },
});

const createUserDatasource = (createUserParams) => instance.post('/user/create', createUserParams);
const loginDatasource = (loginParams) => instance.post('/user/auth', loginParams);
const deliveriesDatasource = () => instance.get('/deliveries');
const resetDeliveriesDatasource = () => instance.delete('/deliveries');

export {
  createUserDatasource,
  deliveriesDatasource,
  loginDatasource,
  resetDeliveriesDatasource,
};
