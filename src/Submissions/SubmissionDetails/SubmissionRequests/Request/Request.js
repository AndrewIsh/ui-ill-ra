import React from 'react';
import PropTypes from 'prop-types';

import { RequestSummary } from './RequestSummary';

const Request = ({ request }) => {
  return <RequestSummary request={request} />;
};

Request.propTypes = {
  request: PropTypes.object.isRequired
};

export default Request;
