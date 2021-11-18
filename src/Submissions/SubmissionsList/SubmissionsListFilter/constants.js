import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
    SUBMISSION_STATUS,
    SUBMISSION_STATUS_LABELS
} from '../../../common/constants';


export const FILTERS = {
    STATUS: 'status',
    TITLE: 'title'
};


export const STATUS_OPTIONS = Object.values(SUBMISSION_STATUS).map(status => ({
    value: status,
    label: SUBMISSION_STATUS_LABELS[status],
}));

export const BOOLEAN_OPTIONS = [
    {
        value: 'true',
        label: <FormattedMessage id="ui-ill-ra.filterConfig.boolean.true" />,
    },
    {
        value: 'false',
        label: <FormattedMessage id="ui-ill-ra.filterConfig.boolean.false" />,
    },
];