import React from 'react';
import { FormattedMessage } from 'react-intl';

export const FILTERS = {
    STATUS: 'status',
    TITLE: 'title'
};

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
