import React from 'react';
import PropTypes from 'prop-types';

import {
  Row,
  Col
} from '@folio/stripes/components';

import { useConnectors } from '../../../common/hooks/useConnectors';

import { Request } from './Request';

const SubmissionRequests = ({ requests }) => {

  const { results } = useConnectors();

  return requests.map(request => (<Row key={request.id}>
    <Col xs={12}>
      <Request request={request} connectors={results} />
    </Col>
  </Row>));
};

SubmissionRequests.propTypes = {
  requests: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired
};

export default SubmissionRequests;
