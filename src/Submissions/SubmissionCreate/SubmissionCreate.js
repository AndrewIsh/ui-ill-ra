import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { stripesConnect } from '@folio/stripes/core';
import { useShowCallout } from '@folio/stripes-acq-components';

import {
  SUBMISSIONS_ROUTE,
  SUBMISSION_VIEW_ROUTE
} from '../../common/constants';

import { submissionsResource } from '../../common/resources';
import { SubmissionForm } from '../SubmissionForm';

import { handleSaveErrorResponse } from '../handleSaveErrorResponse';

const INITIAL_VALUES = {};

const SubmissionCreate = ({ history, location, mutator, okapi }) => {
  const showCallout = useShowCallout();
  const intl = useIntl();

  const cancelForm = useCallback(
    (id) => {
      history.push({
        pathname: id ? `${SUBMISSION_VIEW_ROUTE}${id}` : SUBMISSIONS_ROUTE,
        search: location.search,
        state: id ? { isDetailsPaneInFocus: true } : undefined,
      });
    },
    [history, location.search],
  );

  const createSubmission = useCallback(
    (data) => {
      // Add the user to the submission body before it is sent
      data.userId = okapi.currentUser.id;

      return mutator.createSubmission.POST(data)
        .then(submission => {
          setTimeout(() => cancelForm(submission.id));
        })
        .catch(async e => {
          await handleSaveErrorResponse(intl, showCallout, e);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cancelForm, intl, showCallout],
  );

  return (
    <SubmissionForm
      initialValues={INITIAL_VALUES}
      onSubmit={createSubmission}
      cancelForm={cancelForm}
    />
  );
}

SubmissionCreate.manifest = Object.freeze({
  createSubmission: submissionsResource
});

SubmissionCreate.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  mutator: PropTypes.object.isRequired,
};

export default withRouter(stripesConnect(SubmissionCreate));
