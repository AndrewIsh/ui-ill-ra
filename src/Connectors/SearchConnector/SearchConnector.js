import React from 'react';

import { FormattedMessage } from 'react-intl';

import {
  MultiColumnList,
} from '@folio/stripes/components';

import {
  RESULT_COUNT_INCREMENT,
  FiltersPane,
  handleKeyCommand,
  NoResultsMessage,
  ResetButton,
  ResultsPane,
  SingleSearchForm,
  PrevNextPagination,
  useFiltersToogle,
  useLocationFilters,
  useLocationSorting,
  useItemToView,
} from '@folio/stripes-acq-components';

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
  title: ({ title }) => title,
  author: ({ author }) => author,
  publisher: ({ publisher }) => publisher,
  type: ({ type }) => type,
};

const SearchConnector = ({
  isLoading,
  onNeedMoreData,
  pagination,
  refreshList,
  resetData,
  results,
  totalRecords
}) => {

  // Translate what data we've received into a flat structure
  // so we can pass it to MultiColumnList
  // We wouldn't be able to do this if we had overlapping property
  // names in nested object, but we don't
  const flat = results.map(result => ({
    id: result.id,
    available: result.available,
    ...result?.metadata?.itemLevel,
    ...result?.metadata?.titleLevel
  }));

  const resultsStatusMessage = (
    <NoResultsMessage
      isLoading={isLoading}
    //filters={filters}
    //isFiltersOpened={isFiltersOpened}
    isFiltersOpened={false}
    //toggleFilters={toggleFilters}
      toggleFilters={() => { }}
    />
  );
  console.log(flat);
  return <>
    <MultiColumnList
      id="connector-search-results"
      totalCount={totalRecords}
      contentData={flat}
      visibleColumns={visibleColumns}
      columnMapping={columnMapping}
      columnWidths={columnWidths}
      formatter={resultsFormatter}
      loading={isLoading}
      onNeedMoreData={onNeedMoreData}
      //        sortOrder={sortingField}
      //        sortDirection={sortingDirection}
      //        onHeaderClick={changeSorting}
      //        onRowClick={openSubmissionDetails}
      isEmptyMessage={resultsStatusMessage}
      pagingType="click"
      hasMargin
      pageAmount={RESULT_COUNT_INCREMENT}
      //height={height - PrevNextPagination.HEIGHT}
      //width={width}
    //        itemToView={itemToView}
    //        onMarkPosition={setItemToView}
    //        onResetMark={deleteItemToView}
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

export default SearchConnector;
