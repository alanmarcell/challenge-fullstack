import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as R from 'ramda';
import { deliveriesDatasource } from '../../datasource/challenge.datasource';
import DeliveriesList from './DeliveriesList';

const DeliveriesScene = () => {
  const history = useHistory();
  const [deliveries, setDeliveries] = useState([]);
  useEffect(() => {
    if (R.isEmpty(deliveries)) {
      deliveriesDatasource().then(res => {
        setDeliveries(res.data.deliveries);
      });
    }
  });

  useEffect(() => {
    const token = localStorage.getItem('user-token');
    if (!token) {
      history.push('/');
    }
  });

  return <DeliveriesList deliveries={deliveries} />;
};

export default DeliveriesScene;
