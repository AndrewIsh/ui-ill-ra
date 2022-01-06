import React, {
  useCallback
} from 'react';
import {
  useHistory,
  useLocation,
  useParams
} from 'react-router-dom';

import {
  RESULT_COUNT_INCREMENT,
  usePagination,
  LoadingPane,
  useShowCallout
} from '@folio/stripes-acq-components';

import { stripesConnect } from '@folio/stripes/core';

import SubmissionDetails from './SubmissionDetails';
import { useSubmissions } from '../hooks/useSubmissions';
import { useRequests } from '../hooks/useRequests';
import { useSubmissionStatuses } from '../hooks/useSubmissionStatuses';
import { submissionResourceByUrl } from '../../common/resources';
import {
  SUBMISSIONS_ROUTE
} from '../../common/constants';

export const SubmissionDetailsContainer = ({
  mutator,
  refreshList
}) => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const showCallout = useShowCallout();

  const submissionId = params.id;

  const key = 'submission-details';

  const {
    pagination,
  } = usePagination({ limit: RESULT_COUNT_INCREMENT, offset: 0 });

  const { submissions, isLoading } = useSubmissions({
    pagination,
    submissionId,
    key
  });

  const submission = submissions ? submissions[0] : {};

  const {
    requests,
    totalRecords
  } = useRequests({ pagination, submissionId: submissionId })

  const {
    statuses
  } = useSubmissionStatuses();


  const closePane = useCallback(
    () => {
      history.push({
        pathname: SUBMISSIONS_ROUTE,
        search: location.search,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.search],
  );

  const editSubmission = useCallback(
    () => {
      history.push({
        pathname: `${SUBMISSIONS_ROUTE}/${submissionId}/edit`,
        search: location.search,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [submissionId, location.search],
  );

  const deleteSubmission = useCallback(
    () => {
      mutator.submissionDetails.DELETE({ id: submission.id }, { silent: true }).then(() => {
        showCallout({
          messageId: 'ui-ill-ra.submission.delete.success',
          type: 'success'
        });
        refreshList();
        history.replace({
          pathname: SUBMISSIONS_ROUTE,
          search: location.search,
        });
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [submissionId, showCallout, history, location.search],
  );

  if (isLoading) {
    return (
      <LoadingPane
        id="pane-submission-details"
        onClose={closePane}
      />
    );
  }

  return <SubmissionDetails
    statuses={statuses}
    submission={submission}
    requests={requests}
    requestsCount={totalRecords}
    onClose={closePane}
    onEdit={editSubmission}
    onDelete={deleteSubmission}
  />;
};

SubmissionDetailsContainer.manifest = Object.freeze({
  submissionDetails: {
    ...submissionResourceByUrl,
    accumulate: true,
  }
});

export default stripesConnect(SubmissionDetailsContainer);
