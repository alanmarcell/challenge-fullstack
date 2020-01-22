import axios from 'axios';

const findAddressDatasource = (findAddressParams) => {
  const queryString = findAddressParams.reduce((acc, el) => `${acc}+${el}`);
  return axios({
    baseURL: `https://maps.googleapis.com/maps/api/geocode/json?address=${queryString}&key=${process.env.REACT_APP_GOOGLE_API}`,
  });
};

export default findAddressDatasource;
