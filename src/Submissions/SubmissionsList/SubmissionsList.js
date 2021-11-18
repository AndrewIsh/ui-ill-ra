import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import {
  checkScope,
  HasCommand,
  MultiColumnList,
} from '@folio/stripes/components';
import { useStripes } from '@folio/stripes/core';
import { PersistedPaneset } from '@folio/stripes/smart-components';
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

import {
  SUBMISSIONS_ROUTE,
  VIEW_SUB_DETAILS,
} from '../../common/constants';
import { SubmissionDetailsContainer } from '../SubmissionDetails';
import SubmissionsListFilter from './SubmissionsListFilter';
import {
  searchableIndexes,
} from './SubmissionsListSearchConfig';
import SubmissionsListLastMenu from './SubmissionsListLastMenu';

const resultsPaneTitle = <FormattedMessage id="ui-ill-ra.meta.title" />;
const visibleColumns = ['subId', 'title', 'partTitle', 'publicationType'];
const sortableFields = ['subId', 'title', 'partTitle', 'publicationType'];
const columnMapping = {
  subId: <FormattedMessage id="ui-ill-ra.main.id" />,
  title: <FormattedMessage id="ui-ill-ra.main.title" />,
  partTitle: <FormattedMessage id="ui-ill-ra.main.partTitle" />,
  publicationType: <FormattedMessage id="ui-ill-ra.main.publicationType" />
};
const resultsFormatter = {
  subId: ({ id }) => id,
  title: ({ submissionMetadata }) => submissionMetadata?.BibliographicInfo?.Title,
  partTitle: ({ submissionMetadata }) => submissionMetadata?.BibliographicInfo?.TitleOfComponent,
  publicationType: ({ submissionMetadata }) => submissionMetadata?.PublicationInfo?.PublicationType
};

const SubmissionsList = ({
  isLoading,
  onNeedMoreData,
  resetData,
  submissions,
  submissionsCount,
  refreshList,
  resultsPaneTitleRef,
  pagination
}) => {
  const stripes = useStripes();
  const history = useHistory();
  const location = useLocation();
  const isDetailsPaneInFocus = location.state?.isDetailsPaneInFocus;
  const [
    filters,
    searchQuery,
    applyFilters,
    applySearch,
    changeSearch,
    resetFilters,
    changeIndex,
    searchIndex,
  ] = useLocationFilters(location, history, resetData)
  const [
    sortingField,
    sortingDirection,
    changeSorting,
  ] = useLocationSorting(location, history, resetData, sortableFields);

  const { isFiltersOpened, toggleFilters } = useFiltersToogle('ui-ill-ra/filters');

  const openSubmissionDetails = useCallback(
    (e, meta) => {
      history.push({
        pathname: `${VIEW_SUB_DETAILS}${meta.id}`,
        search: location.search,
        state: { isDetailsPaneInFocus: true },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.search],
  );

  const renderLastMenu = useCallback(() => <SubmissionsListLastMenu />, []);
  const resultsStatusMessage = (
    <NoResultsMessage
      isLoading={isLoading}
      filters={filters}
      isFiltersOpened={isFiltersOpened}
      toggleFilters={toggleFilters}
    />
  );

  const shortcuts = [
    {
      name: 'new',
      handler: handleKeyCommand(() => {
        if (stripes.hasPerm('ui-ill-ra.create')) {
          history.push(`${SUBMISSIONS_ROUTE}/create`);
        }
      }),
    },
  ];

  const { itemToView, setItemToView, deleteItemToView } = useItemToView('submissions-list');

  return (
    <HasCommand
      commands={shortcuts}
      isWithinScope={checkScope}
      scope={document.body}
    >
      <PersistedPaneset
        appId="ui-ill-ra"
        id="ill-ra-paneset"
        data-test-submissions-list
      >
        {isFiltersOpened && (
          <FiltersPane
            id="submissions-filters-pane"
            toggleFilters={toggleFilters}
          >
            <SingleSearchForm
              applySearch={applySearch}
              autoFocus={!isDetailsPaneInFocus}
              changeSearch={changeSearch}
              searchQuery={searchQuery}
              searchableIndexes={searchableIndexes}
              changeSearchIndex={changeIndex}
              selectedIndex={searchIndex}
              isLoading={isLoading}
              ariaLabelId="ui-ill-ra.search"
            />

            <ResetButton
              id="reset-submissions-filters"
              reset={resetFilters}
              disabled={!location.search || isLoading}
            />

            <SubmissionsListFilter
              activeFilters={filters}
              applyFilters={applyFilters}
              disabled={isLoading}
            />
          </FiltersPane>
        )}

        <ResultsPane
          id="submissions-results-pane"
          autosize
          title={resultsPaneTitle}
          count={submissionsCount}
          renderLastMenu={renderLastMenu}
          toggleFiltersPane={toggleFilters}
          filters={filters}
          isFiltersOpened={isFiltersOpened}
          resultsPaneTitleRef={resultsPaneTitleRef}
        >
          {({ height, width }) => (
            <>
              <MultiColumnList
                id="submissions-list"
                totalCount={submissionsCount}
                contentData={submissions}
                visibleColumns={visibleColumns}
                columnMapping={columnMapping}
                formatter={resultsFormatter}
                loading={isLoading}
                onNeedMoreData={onNeedMoreData}
                sortOrder={sortingField}
                sortDirection={sortingDirection}
                onHeaderClick={changeSorting}
                onRowClick={openSubmissionDetails}
                isEmptyMessage={resultsStatusMessage}
                pagingType="click"
                hasMargin
                pageAmount={RESULT_COUNT_INCREMENT}
                height={height - PrevNextPagination.HEIGHT}
                width={width}
                itemToView={itemToView}
                onMarkPosition={setItemToView}
                onResetMark={deleteItemToView}
              />
              {submissions.length > 0 && (
                <PrevNextPagination
                  {...pagination}
                  totalCount={submissionsCount}
                  disabled={isLoading}
                  onChange={onNeedMoreData}
                />
              )}
            </>
          )}
        </ResultsPane>

        <Route
          path={`${VIEW_SUB_DETAILS}:id`}
          render={props => (
            <SubmissionDetailsContainer
              {...props}
              refreshList={refreshList}
            />
          )}
        />
      </PersistedPaneset>
    </HasCommand>
  );
};

SubmissionsList.propTypes = {
  onNeedMoreData: PropTypes.func.isRequired,
  resetData: PropTypes.func.isRequired,
  submissionsCount: PropTypes.number,
  isLoading: PropTypes.bool,
  submissions: PropTypes.arrayOf(PropTypes.object),
  refreshList: PropTypes.func.isRequired,
  resultsPaneTitleRef: PropTypes.object,
  pagination: PropTypes.object,
};

SubmissionsList.defaultProps = {
  submissionsCount: 0,
  isLoading: false,
  submissions: [],
};

export default SubmissionsList;
