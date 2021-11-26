import React from 'react';

import {
    RESULT_COUNT_INCREMENT,
    usePagination
} from '@folio/stripes-acq-components';

import SubmissionsList from './SubmissionsList';
import { useSubmissions } from '../hooks';

const SubmissionsListContainer = () => {
    const {
        pagination,
        changePage,
        refreshPage
    } = usePagination({ limit: RESULT_COUNT_INCREMENT, offset: 0 });
    const {
        submissions,
        totalRecords,
        isLoading
    } = useSubmissions({ pagination });

    return (
        <SubmissionsList
            onNeedMoreData={changePage}
            resetData={() => { }}
            submissionsCount={totalRecords}
            isLoading={isLoading}
            submissions={submissions}
            refreshList={refreshPage}
            pagination={pagination}
        />
    );
};

export default SubmissionsListContainer;
