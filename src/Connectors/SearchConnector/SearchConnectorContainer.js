import React from 'react';

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
    changePage,
    refreshPage
  } = usePagination({ limit: RESULT_COUNT_INCREMENT, offset: 0 });

  const { isLoading, results } = useConnectorSearch({
    pagination,
    submission,
    connector
  });

  if (!results) return null;

  return (
    <SearchConnector
      onNeedMoreData={changePage}
      resetData={() => { }}
      totalRecords={results.totalRecords}
      isLoading={isLoading}
      refreshList={refreshPage}
      pagination={pagination}
      results={results.results}
    />
  );
};

export default SearchConnectorContainer;
