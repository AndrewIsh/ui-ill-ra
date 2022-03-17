import React from 'react';

import { Field } from 'react-final-form'
import { FormattedMessage } from 'react-intl';

import {
  Select,
  Loading
} from '@folio/stripes/components';

import {
  validateRequired,
} from '@folio/stripes-acq-components';

import { useSubmissionStatuses } from '../../hooks/useSubmissionStatuses';

const SubmissionStatus = () => {

  const { isLoading, statuses } = useSubmissionStatuses();

  if (isLoading) {
    return <Loading />;
  }

  return (<Field
    component={Select}
    label={<FormattedMessage id="ui-ill-ra.submission.heading.status" />}
    name="statusId"
    placeholder=" "
    required
    validate={validateRequired}
    validateFields={[]}
  >
    {statuses.map((status) => <option key={status.id} value={status.id}>{status.name}</option>)}
  </Field>);
};

export default SubmissionStatus;
