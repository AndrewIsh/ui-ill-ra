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
    {statuses.map((status) => (
      <FormattedMessage
        id={`ui-ill-ra.submission.status.${status.name.replace(/\s/g,'_')}`}
        key={status.id}
      >
        {(message) => <option value={status.id}>{message}</option>}
      </FormattedMessage>
    ))}
  </Field>);
};

export default SubmissionStatus;
