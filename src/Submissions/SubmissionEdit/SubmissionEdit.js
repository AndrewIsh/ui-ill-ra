import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  stripesConnect,
} from '@folio/stripes/core';
import {
  Paneset,
} from '@folio/stripes/components';
import {
  RESULT_COUNT_INCREMENT,
  usePagination,
  LoadingPane,
  useShowCallout,
} from '@folio/stripes-acq-components';

import { SUBMISSION_VIEW_ROUTE } from '../../common/constants';
import {
  submissionResourceByUrl,
} from '../../common/resources';
import {
  SubmissionForm,
} from '../SubmissionForm';
import { handleSaveErrorResponse } from '../handleSaveErrorResponse';
import { useSubmissions } from '../hooks/useSubmissions';

export const SubmissionEdit = ({ match, history, location, mutator }) => {
  const submissionId = match.params.id;

  const showCallout = useShowCallout();
  const intl = useIntl();

  const key = ['submission-edit', submissionId];

  const {
    pagination,
  } = usePagination({ limit: RESULT_COUNT_INCREMENT, offset: 0 });

  const { submissions, isLoading } = useSubmissions({
    pagination,
    submissionId,
    key
  });

  const submission = submissions ? submissions[0] : {};

  const cancelForm = useCallback(
    () => {
      history.push({
        pathname: `${SUBMISSION_VIEW_ROUTE}${submissionId}`,
        search: location.search,
        state: { isDetailsPaneInFocus: true },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.search],
  );

  const updateSubmission = useCallback(
    (data) => {
      return mutator.editSubmission.PUT(data)
        .then(() => {
          setTimeout(cancelForm);
        })
        .catch(async e => {
          await handleSaveErrorResponse(intl, showCallout, e);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cancelForm, intl, showCallout],
  );

  if (isLoading) {
    return (
      <Paneset>
        <LoadingPane onClose={cancelForm} />
      </Paneset>
    );
  }

  return (
    <SubmissionForm
      initialValues={submission}
      onSubmit={updateSubmission}
      cancelForm={cancelForm}
      paneTitle={<FormattedMessage id="ui-ill-ra.view.submission.edit" />}
    />
  );
};

SubmissionEdit.manifest = Object.freeze({
  editSubmission: {
    ...submissionResourceByUrl,
    accumulate: true,
  },
});

SubmissionEdit.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  mutator: PropTypes.object.isRequired,
};

export default withRouter(stripesConnect(SubmissionEdit));
