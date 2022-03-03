import React from 'react';
import PropTypes from 'prop-types';

import { RequestSummary } from './RequestSummary';

const Request = ({ request, connectors }) => {
  return <RequestSummary
    request={request}
    connectors={connectors}
  />;
};

Request.propTypes = {
  request: PropTypes.object.isRequired,
  connectors: PropTypes.array.isRequired
};

export default Request;
