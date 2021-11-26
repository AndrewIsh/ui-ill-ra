import React, {
  useCallback,
  useEffect,
  useRef
} from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  useLocation,
  useHistory,
} from 'react-router-dom';

import {
  IfPermission,
  useStripes,
} from '@folio/stripes/core';
import {
  Accordion,
  AccordionSet,
  AccordionStatus,
  Button,
  checkScope,
  Col,
  collapseAllSections,
  ConfirmationModal,
  ExpandAllButton,
  expandAllSections,
  HasCommand,
  Icon,
  MenuSection,
  Pane,
  PaneMenu,
  Row,
} from '@folio/stripes/components';
import { NotesSmartAccordion } from '@folio/stripes/smart-components';
import {
  handleKeyCommand,
  TagsBadge,
  TagsPane,
  useAcqRestrictions,
  useModalToggle,
} from '@folio/stripes-acq-components';

import {
  SUBMISSION_SECTIONS,
  SUBMISSION_SECTION_LABELS,
  SUBMISSIONS_ROUTE
} from '../../common/constants';

import { SubmissionSummary } from './SubmissionSummary';

const SubmissionDetails = ({
  onClose,
  onEdit,
  onDelete,
  onUpdate,
  submission,
  statuses,
}) => {
  const stripes = useStripes();
  const [isRemoveModalOpened, toggleRemoveModal] = useModalToggle();
  const initialAccordionStatus = {
    [SUBMISSION_SECTIONS.summarySection]: true
  };

  const paneTitleRef = useRef();
  const location = useLocation();
  const history = useHistory();
  const accordionStatusRef = useRef();
  const isDetailsPaneInFocus = location.state?.isDetailsPaneInFocus;


  useEffect(() => {
    if (isDetailsPaneInFocus) paneTitleRef.current.focus();
  }, [isDetailsPaneInFocus]);

  const getActionMenu = useCallback(
    ({ onToggle }) => {
      return (
        <MenuSection id="data-test-submissions-details-actions">
          <IfPermission perm="ui-ill-ra.submission.edit">
            <Button
              buttonStyle="dropdownItem"
              data-testid="edit-submission"
              data-test-button-edit-submission
              onClick={() => {
                onToggle();
                onEdit();
              }}
            >
              <Icon size="small" icon="edit">
                <FormattedMessage id="ui-ill-ra.view.edit" />
              </Icon>
            </Button>
          </IfPermission>
          <IfPermission perm="ui-ill-ra.submission.delete">
            <Button
              buttonStyle="dropdownItem"
              data-testid="delete-submission"
              data-test-button-delete-submission
              onClick={() => {
                onToggle();
                toggleRemoveModal();
              }}
            >
              <Icon size="small" icon="trash">
                <FormattedMessage id="ui-ill-ra.view.delete" />
              </Icon>
            </Button>
          </IfPermission>
        </MenuSection>
      );
    },
    [onEdit, toggleRemoveModal],
  );

  const shortcuts = [
    {
      name: 'new',
      handler: handleKeyCommand(() => {
        if (stripes.hasPerm('ui-ill-ra.submissions.create')) {
          history.push(`${SUBMISSIONS_ROUTE}/create`);
        }
      }),
    },
    {
      name: 'edit',
      handler: handleKeyCommand(() => {
        if (
          stripes.hasPerm('ui-ill-ra.submissions.edit')
        ) onEdit();
      }),
    },
    {
      name: 'expandAllSections',
      handler: (e) => expandAllSections(e, accordionStatusRef),
    },
    {
      name: 'collapseAllSections',
      handler: (e) => collapseAllSections(e, accordionStatusRef),
    },
  ];

  return <HasCommand
    commands={shortcuts}
    isWithinScope={checkScope}
    scope={document.body}
  >
    <Pane
      id="pane-submission-details"
      defaultWidth="fill"
      dismissible
      paneTitle={'TESTING'} // TODO: Should be a title
      paneTitleRef={paneTitleRef}
      onClose={onClose}
      actionMenu={getActionMenu}
    >
      <AccordionStatus ref={accordionStatusRef}>
        <Row end="xs">
          <Col xs={12}>
            <ExpandAllButton />
          </Col>
        </Row>

        <AccordionSet initialStatus={initialAccordionStatus}>
          <Accordion
            id={SUBMISSION_SECTIONS.summarySection}
            label={SUBMISSION_SECTION_LABELS[SUBMISSION_SECTIONS.summarySection]}
          >
            <SubmissionSummary
              submission={submission}
            />
          </Accordion>
        </AccordionSet>
      </AccordionStatus>

    </Pane>
  </HasCommand>
};

SubmissionDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  submission: PropTypes.object.isRequired,
  statuses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string,
  })),
};


SubmissionDetails.defaultProps = {
  submission: {},
  statuses: []
};

export default SubmissionDetails;
