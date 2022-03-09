import React, { useMemo } from 'react';

import {
  FormattedMessage,
  useIntl
} from 'react-intl';

import {
  useStripes
} from '@folio/stripes/core';
import { ControlledVocab } from '@folio/stripes/smart-components';

const SubmissionStatuses = () => {
  const { formatMessage } = useIntl();
  const stripes = useStripes();

  const ConnectedControlledVocab = useMemo(() => stripes.connect(ControlledVocab), [stripes]);

  const columnMapping = {
    value: <FormattedMessage id="ui-ill-ra.settings.submissionStatuses.value" />,
    action: <FormattedMessage id="ui-ill-ra.settings.submissionStatuses.action" />,
  };

  const canManage = () => stripes.hasPerm('settings.ill-ra.manage.submission-statuses');

  return (
    <ConnectedControlledVocab
      stripes={stripes}
      canCreate={canManage()}
      baseUrl="ill-ra/submission-statuses"
      records="statuses"
      label="This is the label"
      labelSingular="This is the singular label"
      objectLabel="This is the object label"
      visibleFields={['name']}
      columnMapping={columnMapping}
      nameKey="submissionStatuses"
      id="settings-submissionStatuses"
      actionSuppressor={{
        delete: !canManage(),
        edit: !canManage()
      }}
    />
  );
};

export default SubmissionStatuses;
