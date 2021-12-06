import React from 'react';
import PropTypes from 'prop-types';

import {
  Row,
  Col
} from '@folio/stripes/components';

import { Request } from './Request';

const SubmissionRequests = ({ requests }) => {
  return requests.map(request => (<Row key={request.id}>
    <Col xs={12}>
      <Request request={request} />
    </Col>
  </Row>));
};

SubmissionRequests.propTypes = {
  requests: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired
};

export default SubmissionRequests;
