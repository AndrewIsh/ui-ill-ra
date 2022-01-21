import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import {
  MultiColumnList,
} from '@folio/stripes/components';

import {
  RESULT_COUNT_INCREMENT,
  PrevNextPagination,
} from '@folio/stripes-acq-components';

import { NoResultsMessage } from './NoResultsMessage';

const visibleColumns = ['title', 'author', 'publisher', 'type'];

const columnMapping = {
  title: <FormattedMessage id="ui-ill-ra.connector.search.result.title" />,
  author: <FormattedMessage id="ui-ill-ra.connector.search.result.author" />,
  publisher: <FormattedMessage id="ui-ill-ra.connector.search.result.publisher" />,
  type: <FormattedMessage id="ui-ill-ra.connector.search.result.type" />,
};

const columnWidths = {
  title: '500px',
  author: '500px',
  publisher: '500px',
  type: '100px'
};

const resultsFormatter = {
  title: ({ metadata }) => metadata?.titleLevel?.title,
  author: ({ metadata }) => metadata?.titleLevel?.author,
  publisher: ({ metadata }) => metadata?.titleLevel?.publisher,
  type: ({ metadata }) => {
    let splut = metadata?.itemLevel.type.split('');
    splut[0] = splut[0].toUpperCase();
    return splut.join('');
  },
};

const SearchConnector = ({
  onNeedMoreData,
  totalRecords,
  isLoading,
  pagination,
  results
}) => {

  const resultsStatusMessage = (
    <NoResultsMessage isLoading={isLoading} />
  );

  return <>
    <MultiColumnList
      id="connector-search-results"
      totalCount={totalRecords}
      contentData={results}
      visibleColumns={visibleColumns}
      columnMapping={columnMapping}
      columnWidths={columnWidths}
      formatter={resultsFormatter}
      loading={isLoading}
      onNeedMoreData={onNeedMoreData}
      isEmptyMessage={resultsStatusMessage}
      pagingType="click"
      hasMargin
      pageAmount={RESULT_COUNT_INCREMENT}
    />
    {results.length > 0 && (
      <PrevNextPagination
        {...pagination}
        totalCount={totalRecords}
        disabled={isLoading}
        onChange={onNeedMoreData}
      />
    )}
  </>
}

SearchConnector.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onNeedMoreData: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  results: PropTypes.array.isRequired,
  totalRecords: PropTypes.number.isRequired
};

SearchConnector.defaultProps = {
  results: [],
  totalRecords: 0
};

export default SearchConnector;
