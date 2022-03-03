import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy
} from '@folio/stripes/core';

import {
  MESSAGES_API
} from '../../../common/constants/api';

const queryFn = (ky, requestId) => {
  return ky
    .get(MESSAGES_API.replace('requestId', requestId))
    .json();
}

// Return a list of all messages pertaining to a request
export const useMessages = ({ requestId }) => {
  const ky = useOkapiKy();
  const [namespace] = useNamespace({ key: 'ill-request-messages' });

  const { isFetching, data } = useQuery(
    [namespace, requestId],
    () => queryFn(ky, requestId)
  );

  return {
    isLoading: isFetching,
    results: data
  };
};

export default useMessages;
