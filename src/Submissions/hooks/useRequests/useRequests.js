import { useQuery } from 'react-query';
import { useLocation } from 'react-router';
import queryString from 'query-string';

import {
  useNamespace,
  useOkapiKy
} from '@folio/stripes/core';

import {
  getFiltersCount
} from '@folio/stripes-acq-components';

import {
  SUBMISSIONS_API,
  REQUESTS_API,
} from '../../../common/constants';

import { useBuildQuery } from '../useBuildQuery';

export const useRequests = ({
  pagination,
  searchParams = {},
  options = {},
  requestId,
  submissionId
}) => {
  const ky = useOkapiKy();
  const [namespace] = useNamespace({ key: 'requests-list' });

  const { search } = useLocation();
  const buildQuery = useBuildQuery();
  const queryParams = queryString.parse(search);
  const query = buildQuery(queryParams);
  const filtersCount = getFiltersCount(queryParams);

  let defaultSearchParams = {
    query,
    limit: pagination.limit,
    offset: pagination.offset
  };

  // Determine the endpoint we're using
  let endpoint = REQUESTS_API;
  if (requestId) {
    endpoint = `${REQUESTS_API}/${requestId}`;
  } else if (submissionId) {
    endpoint = `${SUBMISSIONS_API}/${submissionId}/requests`;
    defaultSearchParams = {};
    searchParams = {};
  } else {
    endpoint = REQUESTS_API;
  }

  const queryKey = [namespace, pagination.timestamp, pagination.limit, pagination.offset];
  const queryFn = () => {
    if (!filtersCount) {
      return { requests: [], totalRecords: 0 };
    }

    return ky
      .get(endpoint, { searchParams: { ...defaultSearchParams, ...searchParams } })
      .json();
  }
  const defaultOptions = {
    enabled: Boolean(pagination.timestamp),
    keepPreviousData: true
  };

  const { isFetching, data } = useQuery(
    queryKey,
    queryFn,
    {
      ...defaultOptions,
      ...options
    }
  );
  return ({
    ...data,
    isLoading: isFetching
  });
};

