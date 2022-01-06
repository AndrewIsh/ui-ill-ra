import React from 'react';
import { Switch, Route } from 'react-router-dom';

import {
  SUBMISSIONS_ROUTE,
  SUBMISSION_CREATE_ROUTE,
  SUBMISSION_EDIT_ROUTE
} from '../common/constants';

import { SubmissionsListContainer } from './SubmissionsList';
import { SubmissionCreate } from './SubmissionCreate';
import { SubmissionEdit } from './SubmissionEdit';

const Submissions = () => {
  return (
    <Switch>
      <Route
        path={SUBMISSION_CREATE_ROUTE}
        component={SubmissionCreate}
      />
      <Route
        path={SUBMISSION_EDIT_ROUTE}
        component={SubmissionEdit}
      />
      <Route
        path={SUBMISSIONS_ROUTE}
        component={SubmissionsListContainer}
      />
    </Switch>
  );
};

export default Submissions;
