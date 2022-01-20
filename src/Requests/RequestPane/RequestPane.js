import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  handleKeyCommand,
  useAccordionToggle
} from '@folio/stripes-acq-components';

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
import { SearchConnectorContainer } from '../../Connectors/SearchConnector';

const RequestPane = ({
  paneTitle,
  cancelForm,
  connectors,
  submission
}) => {

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
                {connectors.map((connector) =>
                  <Accordion
                    id={connector.id}
                    key={connector.id}
                    label={connector.name}
                    displayWhenClosed={<ConnectorAbilities connector={connector} />}
                    displayWhenOpen={<ConnectorAbilities connector={connector} />}
                  >
                    <SearchConnectorContainer
                      submission={submission}
                      connector={connector}
                    />
                  </Accordion>
                )}
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

export default RequestPane;
