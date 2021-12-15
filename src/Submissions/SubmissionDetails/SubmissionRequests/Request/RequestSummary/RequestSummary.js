import React, { useState, useEffect, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import {
  Row,
  Col,
  KeyValue
} from '@folio/stripes/components';
import {
  ViewMetaData
} from '@folio/stripes/smart-components';

import { REQUEST_SECTIONS } from '../../../../../common/constants';

const RequestSummary = ({ request }) => {
  const [requestMetadata, setRequestMetadata] = useState({});

  useEffect(() => setRequestMetadata(
    JSON.parse(request.requestMetadata)
  ), [request.requestMetadata]);

  return <>
    <Row>
      <Col xs={12}>
        {request.metadata && (
          <ViewMetaData
            id={`${REQUEST_SECTIONS.summarySection}.metadata`}
            metadata={request.metadata}
          />
        )}
      </Col>
    </Row>
    <Row>
      <Col xs={6}>
        <KeyValue
          data-testid="connector"
          label={<FormattedMessage id="ui-ill-ra.submission.requests.request.supplier.name" />}
          value={requestMetadata.connector}
        />
      </Col>
      <Col xs={6}>
        <KeyValue
          data-testid="connector"
          label={<FormattedMessage id="ui-ill-ra.submission.requests.request.supplierRequestId" />}
          value={requestMetadata.Header?.SupplyingAgencyRequestId}
        />
      </Col>
    </Row>
  </>
};

RequestSummary.propTypes = {
  request: PropTypes.object.isRequired
};

export default RequestSummary;
