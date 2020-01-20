import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import React from 'react';
import RegisterScene from '../scenes/Register';
import LoginScene from '../scenes/Login';

const Routes = () => {
  return (
    <Router>
      <Switch>
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
