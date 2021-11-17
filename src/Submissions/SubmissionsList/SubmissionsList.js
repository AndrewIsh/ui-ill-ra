import React from 'react';
import PropTypes from 'prop-types';
import {
    Route,
    useHistory,
    useLocation,
} from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

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
    searchableIndexes,
} from './SubmissionsListSearchConfig';

import SubmissionsListFilter from './SubmissionsListFilter';

import {
    checkScope,
    HasCommand,
    MultiColumnList,
} from '@folio/stripes/components';

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
    const history = useHistory();
    const location = useLocation();
    const isDetailsPaneInFocus = location.state?.isDetailsPaneInFocus;
    const visibleColumns = ['subId', 'title', 'partTitle', 'publicationType'];
    const sortableFields = ['subId', 'title', 'partTitle', 'publicationType'];
    const { isFiltersOpened, toggleFilters } = useFiltersToogle('ui-ill-ra/filters');
    const resultsPaneTitle = <FormattedMessage id="ui-ill-ra.meta.title" />;
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

    const resultsStatusMessage = (
        <NoResultsMessage
            isLoading={isLoading}
            filters={filters}
            isFiltersOpened={isFiltersOpened}
            toggleFilters={toggleFilters}
        />
    );

    return (
        <PersistedPaneset
            appId="ui-ill-ra"
            id="ill-ra-paneset"
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
                            //onRowClick={openOrganizationDetails}
                            isEmptyMessage={resultsStatusMessage}
                            //pagingType="none"
                            hasMargin
                            pageAmount={RESULT_COUNT_INCREMENT}
                            height={height - PrevNextPagination.HEIGHT}
                            width={width}
                            //itemToView={itemToView}
                            //onMarkPosition={setItemToView}
                            //onResetMark={deleteItemToView}
                        />
                        {submissions && submissions.length > 0 && (
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
        </PersistedPaneset>
    );
};

export default SubmissionsList;