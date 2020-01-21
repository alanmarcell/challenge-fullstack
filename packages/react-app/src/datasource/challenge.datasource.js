import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000',
  headers: { 'Content-Type': 'application/json' },
});

const createUserDatasource = (createUserParams) => instance.post('/user/create', createUserParams);
const loginDatasource = (loginParams) => instance.post('/user/auth', loginParams);
const deliveriesDatasource = () => instance.get('/deliveries');

export {
  createUserDatasource,
  deliveriesDatasource,
  loginDatasource,
};
