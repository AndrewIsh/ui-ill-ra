import React from 'react';
import PropTypes from 'prop-types';

import {
  RESULT_COUNT_INCREMENT,
  usePagination
} from '@folio/stripes-acq-components';

import SearchConnector from './SearchConnector';
import { useConnectorSearch } from '../../common/hooks/useConnectorSearch';

const SearchConnectorContainer = ({
  submission,
  connector
}) => {

  if (!submission || !connector) return null;

  const {
    pagination,
    changePage
  } = usePagination({ limit: RESULT_COUNT_INCREMENT, offset: 0 });

  const { isLoading, results } = useConnectorSearch({
    pagination,
    submission,
    connector
  });

  return (
    <SearchConnector
      onNeedMoreData={changePage}
      totalRecords={results.totalRecords}
      isLoading={isLoading}
      pagination={pagination}
      results={results.results}
    />
  );
};

SearchConnectorContainer.propTypes = {
  submission: PropTypes.object.isRequired,
  connector: PropTypes.object.isRequired
};

export default SearchConnectorContainer;
