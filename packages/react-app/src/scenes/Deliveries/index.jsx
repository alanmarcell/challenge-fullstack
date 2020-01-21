import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const DeliveriesScene = () => {
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('user-token');
    if (!token) {
      history.push('/');
    }
  });

  return (
    <div>
      <h1>Deliveries</h1>
    </div>
  );
};

export default DeliveriesScene;
