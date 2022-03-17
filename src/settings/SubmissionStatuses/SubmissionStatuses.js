import React from 'react';

import { useStripes } from '@folio/stripes/core';
import { ControlledVocab } from '@folio/stripes/smart-components';

import { useIntl } from 'react-intl';

const SubmissionStatuses = () => {
  const stripes = useStripes();
  const intl = useIntl();

  const ConnectedControlledVocab = stripes.connect(ControlledVocab);

  const actionProps = {
    delete: status => ({ disabled: status.default || status.submissionCount > 0 })
  };

  const populateDefault = row => ({ ...row, default: row.default ? row.default : false });

  return <ConnectedControlledVocab
    stripes={stripes}
    sortby="name"
    records="statuses"
    baseUrl="ill-ra/submission-statuses"
    label={intl.formatMessage({ id: 'ui-ill-ra.settings.submissionStatuses' })}
    labelSingular={intl.formatMessage({ id: 'ui-ill-ra.settings.submissionStatuses.labelSingular' })}
    objectLabel={intl.formatMessage({ id: 'ui-ill-ra.settings.submissionStatuses.objectLabel' })}
    actionProps={actionProps}
    preCreateHook={populateDefault}
    preUpdateHook={populateDefault}
    readOnlyFields={['submissionCount']}
    visibleFields={['name', 'submissionCount']}
    hiddenFields={['numberOfObjects']}
    columnMapping={{
      name: intl.formatMessage({ id: 'ui-ill-ra.settings.submissionStatuses.statusName'}),
      actions: intl.formatMessage({ id: 'ui-ill-ra.settings.submissionStatuses.actions' }),
      submissionCount: intl.formatMessage({ id: 'ui-ill-ra.settings.submissionStatuses.submissionCount' })
    }}
  />;
};

export default SubmissionStatuses;
