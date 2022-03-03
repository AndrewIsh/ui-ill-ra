import React from 'react';
import PropTypes from 'prop-types';

import {
  HandlerManager,
  withStripes
} from '@folio/stripes-core';

import {
  Row,
  Col,
} from '@folio/stripes/components';

import {
  ViewMetaData
} from '@folio/stripes/smart-components';

import { REQUEST_SECTIONS } from '../../../../../common/constants';

import { useMessages } from '../../../../../Requests/hooks/useMessages';

import css from './RequestSummary.css';

const RequestSummary = ({ request, stripes, connectors }) => {
  const { isLoading, results } = useMessages({ requestId: request.id });

  const getConnectorName = id => {
    const connector = connectors.find(conn => conn.id === id);
    return connector ? connector.name : null;
  }

  return <>
    <Row>
      <Col xs={12}>
        <h3>{getConnectorName(request.connectorId)}</h3>
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        {request.metadata && (
          <ViewMetaData
            id={`${REQUEST_SECTIONS.summarySection}.metadata`}
            metadata={request?.metadata}
          />
        )}
      </Col>
    </Row>
    <Row className={css.summary}>
      <Col xs={12}>
        <HandlerManager
          event="ui-ill-ra-request-display"
          stripes={stripes}
          data={{
            event: 'ui-ill-ra-request-display',
            connector: { id: request.connectorId },
            request,
            messages: {
              isLoading,
              results
            }
          }}
        />
      </Col>
    </Row>
  </>
};

RequestSummary.propTypes = {
  request: PropTypes.object.isRequired,
  stripes: PropTypes.object.isRequired,
  connectors: PropTypes.array.isRequired
};

export default withStripes(RequestSummary);
