import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import {
  AccordionSet
} from '@folio/stripes/components';

import {
  AcqCheckboxFilter
} from '@folio/stripes-acq-components';

import {
  FILTERS
} from './constants';

import { useSubmissionStatuses } from '../../hooks/useSubmissionStatuses';

const applyFiltersAdapter = (applyFilters) => ({ name, values }) => applyFilters(name, values);

const getStatusOptions = (statuses) => {
  if (!statuses) return [];
  return statuses.map(
    status => ({ value: status.id, label: status.name })
  );
};

const SubmissionsListFilter = ({
  activeFilters,
  applyFilters,
  disabled
}) => {
  const adaptedApplyFilters = useCallback(
    applyFiltersAdapter(applyFilters),
    [applyFilters]
  );

  const { isLoading, statuses } = useSubmissionStatuses();

  return (
    <AccordionSet>
      <AcqCheckboxFilter
        activeFilters={activeFilters[FILTERS.STATUS]}
        disabled={disabled}
        id={`sub-filter-${FILTERS.STATUS}`}
        labelId="ui-ill-ra.filterConfig.submissionStatus"
        name={FILTERS.STATUS}
        onChange={adaptedApplyFilters}
        options={getStatusOptions(statuses)}
        closedByDefault={false}
      />
    </AccordionSet>
  )
};

SubmissionsListFilter.propTypes = {
  activeFilters: PropTypes.object.isRequired,
  applyFilters: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default SubmissionsListFilter;
