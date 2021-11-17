import React from 'react';
import { FormattedMessage } from 'react-intl';

export const SUBMISSION_STATUS = {
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending',
};

export const SUBMISSION_STATUS_LABELS = {
    [SUBMISSION_STATUS.active]: <FormattedMessage id="ui-ill-ra.submissionStatus.active" />,
    [SUBMISSION_STATUS.inactive]: <FormattedMessage id="ui-ill-ra.submissionStatus.inactive" />,
    [SUBMISSION_STATUS.pending]: <FormattedMessage id="ui-ill-ra.submissionStatus.pending" />,
};