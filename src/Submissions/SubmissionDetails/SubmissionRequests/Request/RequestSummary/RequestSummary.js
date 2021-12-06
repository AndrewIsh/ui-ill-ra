import React from 'react';
import PropTypes from 'prop-types';

import {
  Row,
  Col
} from '@folio/stripes/components';
import {
  ViewMetaData
} from '@folio/stripes/smart-components';

import { REQUEST_SECTIONS } from '../../../../../common/constants';

const RequestSummary = ({ request }) => {
  return <Row>
    <Col xs={12}>
      {request.metadata && (
        <ViewMetaData
          id={`${REQUEST_SECTIONS.summarySection}.metadata`}
          metadata={request.metadata}
        />
      )}
    </Col>
  </Row>;
};

RequestSummary.propTypes = {
  request: PropTypes.object.isRequired
};

export default RequestSummary;
