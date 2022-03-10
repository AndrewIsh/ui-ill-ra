import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Settings } from '@folio/stripes/smart-components';
import { SubmissionStatuses }  from './SubmissionStatuses';

const IllSettings = props => {
  const pages = [
    {
      route: 'submission-statuses',
      label: <FormattedMessage id="ui-ill-ra.settings.submissionStatuses" />,
      component: SubmissionStatuses,
      perm: 'settings.ill-ra.manage.submission-statuses'
    }
  ];

  return (
    <Settings {...props} pages={pages} paneTitle={<FormattedMessage id="ui-ill-ra.meta.title" />} />
  );
};

export default IllSettings;
