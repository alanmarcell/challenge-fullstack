import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import React from 'react';
import RegisterScene from '../scenes/Register';
import LoginScene from '../scenes/Login';
import DeliveriesScene from '../scenes/Deliveries';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/deliveries">
          <DeliveriesScene />
        </Route>
        <Route path="/register">
          <RegisterScene />
        </Route>
        <Route path="/">
          <LoginScene />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
