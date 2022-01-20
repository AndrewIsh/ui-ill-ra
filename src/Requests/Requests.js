import React from 'react';
import { Switch, Route } from 'react-router-dom';

import {
  REQUEST_CREATE_ROUTE
} from '../common/constants';

import { RequestCreate } from './RequestCreate';

const Requests = () => {
  return (
    <Switch>
      <Route
        path={REQUEST_CREATE_ROUTE}
        component={RequestCreate}
      />
    </Switch>
  );
};

export default Requests;
