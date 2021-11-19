import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import { SUBMISSIONS_STATUSES_API } from '../../../../common/constants';

export const useSubmissionStatuses = () => {
  const ky = useOkapiKy();

  const queryFn = () => ky.get(SUBMISSIONS_STATUSES_API).json();

  const { isFetching, data } = useQuery(
    'ill-submission-statuses',
    queryFn,
    {
      enabled: true,
      keepPreviousData: true
    }
  );

  return ({
    ...data,
    isFetching
  });
};
