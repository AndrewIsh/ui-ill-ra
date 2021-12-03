import {
  baseManifest,
} from '@folio/stripes-acq-components';

import { LOCATIONS_API } from '../constants';

// eslint-disable-next-line import/prefer-default-export
export const locationsResource = {
  ...baseManifest,
  records: 'locations',
  path: LOCATIONS_API
};
