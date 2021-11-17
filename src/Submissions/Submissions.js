import React from 'react';
import { Switch, Route } from 'react-router-dom';

import {
  SUBMISSIONS_ROUTE
} from '../common/constants';

import { SubmissionsListContainer } from './SubmissionsList';

const Submissions = () => {
  return (
    <Switch>
      <Route
        path={SUBMISSIONS_ROUTE}
        component={SubmissionsListContainer}
      />
    </Switch>
  );
};

export default Submissions;