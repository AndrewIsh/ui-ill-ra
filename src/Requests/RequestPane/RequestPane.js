import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  handleKeyCommand,
  useAccordionToggle
} from '@folio/stripes-acq-components';

import {
  withStripes,
  HandlerManager
} from '@folio/stripes/core';

import {
  Accordion,
  AccordionSet,
  Col,
  checkScope,
  ExpandAllButton,
  HasCommand,
  Pane,
  Paneset,
  Row,
} from '@folio/stripes/components';

import { ConnectorAbilities } from '../../Connectors/ConnectorAbilities';

const RequestPane = ({
  paneTitle,
  cancelForm,
  connectors,
  submission,
  stripes
}) => {

  // Return if we've not yet got any connectors. They are populated asynchonously and if
  // we proceed and call useAccordionToggle with an unpopulated set of connectors our initial
  // accordion state won't be set correctly (since useAccordionToggle's useState will only be
  // called on the first render)
  if (connectors.length === 0) return null;

  const [connectorName, setConnectorName] = useState({});

  const initialAccordionStatus = connectors.reduce(
    (acc, connector) => ({ ...acc, [connector.id]: connectors.length === 1 ? true : false }),
    {}
  );

  const [expandAll, stateSections, toggleSection] = useAccordionToggle(initialAccordionStatus);

  const shortcuts = [
    {
      name: 'cancel',
      shortcut: 'esc',
      handler: handleKeyCommand(cancelForm),
    },
    {
      name: 'expandAllSections',
      handler: () => expandAll(mapValues(stateSections, () => true)),
    },
    {
      name: 'collapseAllSections',
      handler: () => expandAll(mapValues(stateSections, () => false)),
    }
  ];

  const updateConnectorName = ({ id, name }) => {
    if (!connectorName[id]) {
      setConnectorName({
        ...connectorName,
        [id]: name
      });
    }
  };

  return (
    <HasCommand
      commands={shortcuts}
      isWithinScope={checkScope}
      scope={document.body}
    >
      <Paneset>
        <Pane
          data-test-form-request-pane
          defaultWidth="100%"
          dismissible
          paneTitle={paneTitle}
          onClose={cancelForm}
        >
          <h1><FormattedMessage id="ui-ill-ra.request.create.pane.suppliers" /></h1>
          <Row>
            <Col
              xs={12}
              md={8}
              mdOffset={2}
            >
              <Row end="xs">
                <Col xs={12}>
                  <ExpandAllButton
                    accordionStatus={stateSections}
                    onToggle={expandAll}
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col
              xs={12}
              md={8}
              mdOffset={2}
            >
              <AccordionSet
                accordionStatus={stateSections}
                onToggle={toggleSection}
              >
                {connectors.map((connector) => (
                  <Accordion
                    id={connector.id}
                    key={connector.id}
                    label={connectorName[connector.id] || ''}
                    displayWhenClosed={<ConnectorAbilities connector={connector} />}
                    displayWhenOpen={<ConnectorAbilities connector={connector} />}
                  >
                    {stateSections[connector.id] ? (
                      <HandlerManager
                        event="ui-ill-ra-request-create"
                        stripes={stripes}
                        data={{
                          submission,
                          connector,
                          updateConnectorName
                        }}
                      />
                    ) : <></>}
                  </Accordion>
                ))}
              </AccordionSet>
            </Col>
          </Row>
        </Pane>
      </Paneset>
    </HasCommand>
  )
};

RequestPane.propTypes = {
  paneTitle: PropTypes.node,
  cancelForm: PropTypes.func.isRequired,
  connectors: PropTypes.array,
  submission: PropTypes.object
};

RequestPane.defaultProps = {
  paneTitle: <FormattedMessage id="ui-ill-ra.request.create.pane.title" />,
  connectors: [],
  submission: {}
};

export default withStripes(RequestPane);
