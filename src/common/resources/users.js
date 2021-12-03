import {
  baseManifest,
} from '@folio/stripes-acq-components';

import { USERS_API } from '../constants';

// eslint-disable-next-line import/prefer-default-export
export const usersResource = {
  ...baseManifest,
  records: 'users',
  path: USERS_API
};
