import React, {
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import { stripesConnect } from '@folio/stripes/core';
import { Loading } from '@folio/stripes/components';
import { batchFetch } from '@folio/stripes-acq-components';

import {
  locationsResource,
} from '../../../common/resources';

import SubmissionLocations from './SubmissionLocations';

const SubmissionLocationsContainer = ({ mutator, locationIds }) => {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    () => {
      setIsLoading(true);
      batchFetch(mutator.submissionLocationsInterface, locationIds)
        .then(setLocations)
        .catch(() => {
          setLocations([]);
        })
        .finally(() => setIsLoading(false));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SubmissionLocations
      locations={locations}
    />
  );
};

SubmissionLocationsContainer.manifest = Object.freeze({
  submissionLocationsInterface: {
    ...locationsResource,
    accumulate: true
  },
});

SubmissionLocationsContainer.propTypes = {
  locationIds: PropTypes.arrayOf(PropTypes.string),
  mutator: PropTypes.object.isRequired,
};

export default stripesConnect(SubmissionLocationsContainer);
