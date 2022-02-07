import { useState } from 'react';

import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy
} from '@folio/stripes/core';

import {
  CONNECTORS_API,
  CONNECTOR_INFO_API
} from '../../constants/api';

// Build a request to a connector's /info endpoint
// returning a Promise resolving to a JSON object
// of the response
const buildRequest = (ky, connectorId) => {
  return ky
    .extend({ headers: { 'x-okapi-module-id': connectorId } })
    .get(CONNECTOR_INFO_API, {
      hooks: {
        afterResponse: [
          async (_request, _options, response) => {
            const json = await response.json();
            json.id = connectorId;
            return new Response(JSON.stringify(json));
          }
        ]
      }
    })
    .json();
};
// Build a request to get a list of all connnectors
const queryFn = (ky) => {
  return ky
    .get(CONNECTORS_API)
    .json();
}

// Return a list of all connectors' /info endpoint
// responses
const useConnectors = () => {
  const ky = useOkapiKy();
  const [namespace] = useNamespace({ key: 'ill-connectors' });

  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);

  const { isFetching, data } = useQuery(
    [namespace, 'available'],
    () => queryFn(ky)
  );

  if (
    isFetching ||
    results.length > 0 ||
    !data ||
    data.connectors.length === 0
  ) {
    return {
      isLoading,
      results
    };
  }

  const promises = data.connectors.map(connector => buildRequest(ky, connector));

  Promise.all(promises).then(connectors => {
    setIsLoading(false);
    setResults(connectors);
  });

  return {
    isLoading,
    results
  }

};

export default useConnectors;
