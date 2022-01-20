import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import queryString from 'query-string';

import {
  RESULT_COUNT_INCREMENT,
  usePagination,
} from '@folio/stripes-acq-components';

import { useSubmissions } from '../../Submissions/hooks/useSubmissions';
import { useConnectors } from '../../common/hooks/useConnectors';
import { RequestPane } from '../RequestPane';
import { SUBMISSIONS_ROUTE, SUBMISSION_VIEW_ROUTE } from '../../common/constants';

const RequestCreate = ({
  history,
  location
}) => {
  const params = queryString.parse(location.search);
  const submissionId = params.submissionId;

  if (!submissionId) return null;

  const {isLoading, results } = useConnectors();

  const {
    pagination,
  } = usePagination({ limit: RESULT_COUNT_INCREMENT, offset: 0 });

  const key = 'submission-details';
  const { submissions } = useSubmissions({
    pagination,
    submissionId,
    key
  });

  if (!submissions || submissions.length !== 1) return null;

  const submission = submissions[0];

  const cancelForm = useCallback(
    (id) => {
      // Remove the submissionId from the params, including it
      // breaks the route we're about to go to
      delete params.submissionId;
      history.push({
        pathname: submissionId ? `${SUBMISSION_VIEW_ROUTE}${submissionId}` : SUBMISSIONS_ROUTE,
        search: queryString.stringify(params),
        state: submissionId ? { isDetailsPaneInFocus: true } : undefined,
      });
    },
    [history, location.search],
  );
  return (
    <RequestPane
      connectorsLoading={isLoading}
      connectors={results}
      submission={submission}
      cancelForm={cancelForm}
    />
  );
};

RequestCreate.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default RequestCreate;
