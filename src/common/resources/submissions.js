import {
  baseManifest,
} from '@folio/stripes-acq-components';

import { SUBMISSIONS_API } from '../constants';

export const submissionsResource = {
  ...baseManifest,
  accumulate: true,
  fetch: false,
  path: SUBMISSIONS_API,
};

export const submissionResource = {
  throwErrors: false,
  type: 'okapi',
  path: `${SUBMISSIONS_API}/!{subId}`,
};

export const submissionResourceByUrl = {
  ...baseManifest,
  path: `${SUBMISSIONS_API}/:{id}`,
};

export const fetchSubsByParam = {
  ...submissionsResource,
  records: 'submissions',
  accumulate: true,
  fetch: false,
};
