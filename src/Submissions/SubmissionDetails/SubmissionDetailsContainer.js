import React, {
  useCallback
} from 'react';
import {
  useHistory,
  useLocation,
  useParams
} from 'react-router-dom';

import { useIntl } from 'react-intl';

import {
  RESULT_COUNT_INCREMENT,
  usePagination,
  LoadingPane,
  useShowCallout
} from '@folio/stripes-acq-components';

import SubmissionDetails from './SubmissionDetails';
import { useSubmissions } from '../hooks/useSubmissions';
import { useRequests } from '../hooks/useRequests';
import { useSubmissionStatuses } from '../hooks/useSubmissionStatuses';

export const SubmissionDetailsContainer = () => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const intl = useIntl();
  const showCallout = useShowCallout();

  const submissionId = params.id;

  const key = 'submission-details';

  const {
    pagination,
  } = usePagination({ limit: RESULT_COUNT_INCREMENT, offset: 0 });

  const submission = useSubmissions({
    pagination,
    submissionId,
    key
  });

  const {
    requests
  } = useRequests({ pagination, submissionId: submissionId })

  const {
    statuses
  } = useSubmissionStatuses();


  const closePane = useCallback(
    () => {
      history.push({
        pathname: '/illra/submissions',
        search: location.search,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.search],
  );

  const editSubmission = useCallback(
    () => {
      history.push({
        pathname: `/submissions/${submissionId}/edit`,
        search: location.search,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [submissionId, location.search],
  );

  const deleteSubmission = useCallback(
    () => {
      console.log('DELETE');
      /*
      mutator.organizationDetailsOrg.DELETE({ id: organization.id }, { silent: true }).then(() => {
        showCallout({
          messageId: 'ui-organizations.organization.delete.success',
          type: 'success',
          values: { organizationName: organization.name },
        });
        refreshList();
        history.replace({
          pathname: '/organizations',
          search: location.search,
        });
      });
      */
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [submissionId, showCallout, history, location.search],
  );

  const updateSubmission = useCallback(
    (data) => {
      console.log('UPDATE');
      /*
      mutator.organizationDetailsOrg.PUT(data)
        .then(() => mutator.organizationDetailsOrg.GET())
        .then(setOrganization)
        .catch((e) => handleSaveErrorResponse(intl, showCallout, e));
      */
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [intl, showCallout, submissionId],
  );

  if (submission.isLoading) {
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
    onClose={closePane}
    onEdit={editSubmission}
    onDelete={deleteSubmission}
    onUpdate={updateSubmission}
  />;
};

export default SubmissionDetailsContainer;
