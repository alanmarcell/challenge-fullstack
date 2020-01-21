import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000',
  headers: { 'Content-Type': 'application/json' },
});

const createUserDatasource = (createUserParams) => instance.post('/user/create', createUserParams);
const loginDatasource = (loginParams) => instance.post('/user/auth', loginParams);

export {
  loginDatasource,
  createUserDatasource,
};
