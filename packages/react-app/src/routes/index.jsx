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
        <Route path="/auth">
          <LoginScene />
        </Route>
        <Route path="/" exact>
          <LoginScene />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
