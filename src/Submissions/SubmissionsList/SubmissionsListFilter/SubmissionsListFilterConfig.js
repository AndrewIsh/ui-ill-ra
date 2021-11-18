import { buildArrayFieldQuery } from '@folio/stripes-acq-components';

import { FILTERS } from './constants';

export const customFilterMap = {
  [FILTERS.TITLE]: (filterValue) => `${FILTERS.TITLE}=title:${filterValue}`,
//  [FILTERS.ACQUISITIONS_UNIT]: buildArrayFieldQuery.bind(null, [FILTERS.ACQUISITIONS_UNIT]),
//  [FILTERS.TAGS]: buildArrayFieldQuery.bind(null, [FILTERS.TAGS]),
};

export const CUSTOM_SORT_MAP = {
  subId: 'id'
};
