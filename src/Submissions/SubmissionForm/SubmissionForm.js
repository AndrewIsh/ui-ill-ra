import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router';
import { mapValues } from 'lodash';

import stripesForm from '@folio/stripes/final-form';
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
import { ViewMetaData } from '@folio/stripes/smart-components';
import {
  FormFooter,
  handleKeyCommand,
  useAccordionToggle,
} from '@folio/stripes-acq-components';

import { SUBMISSIONS_ROUTE, SUBMISSION_SECTIONS, SUBMISSION_SECTION_LABELS } from '../../common/constants';

import { MAP_FIELD_ACCORDION } from '../../common/constants';

import { SubmissionBibinfoForm } from './SubmissionBibinfoForm';
import { SubmissionPubinfoForm } from './SubmissionPubinfoForm';
import { SubmissionLocationForm } from './SubmissionLocationForm';

const SubmissionForm = ({
  pristine,
  submitting,
  handleSubmit,
  initialValues,
  paneTitle,
  cancelForm,
  values: formValues,
  form
}) => {
  const initialAccordionStatus = {
    [SUBMISSION_SECTIONS.locationSection]: true,
    [SUBMISSION_SECTIONS.bibInfoSection]: true,
    [SUBMISSION_SECTIONS.pubInfoSection]: true
  };
  const [expandAll, stateSections, toggleSection] = useAccordionToggle(initialAccordionStatus);
  const errorAccordions = Object.keys(form.getState().errors).map(
    (fieldName) => ({ [MAP_FIELD_ACCORDION[fieldName]]: true }),
  );
  const sections = errorAccordions.length
    ? {
      ...stateSections,
      ...(errorAccordions.reduce((acc, section) => ({ ...acc, ...section }), {})),
    }
    : stateSections;
  const history = useHistory();
  const { metadata } = initialValues;
  const shortcuts = [
    {
      name: 'cancel',
      shortcut: 'esc',
      handler: handleKeyCommand(cancelForm),
    },
    {
      name: 'save',
      handler: handleKeyCommand(handleSubmit, { disabled: pristine || submitting }),
    },
    {
      name: 'expandAllSections',
      handler: () => expandAll(mapValues(stateSections, () => true)),
    },
    {
      name: 'collapseAllSections',
      handler: () => expandAll(mapValues(stateSections, () => false)),
    },
    {
      name: 'search',
      handler: handleKeyCommand(() => history.push(SUBMISSIONS_ROUTE)),
    },
  ];

  const paneFooter = (
    <FormFooter
      id="submission-form-save"
      label={<FormattedMessage id="ui-ill-ra.button.saveAndClose" />}
      pristine={pristine}
      submitting={submitting}
      handleSubmit={handleSubmit}
      onCancel={cancelForm}
    />
  );

  return (
    <form id="form-submission">
      <HasCommand
        commands={shortcuts}
        isWithinScope={checkScope}
        scope={document.body}
      >
        <Paneset>
          <Pane
            data-test-form-submission-pane
            defaultWidth="100%"
            dismissible
            footer={paneFooter}
            paneTitle={paneTitle}
            onClose={cancelForm}
          >
            <Row>
              <Col
                xs={12}
                md={8}
                mdOffset={2}
              >
                <Row end="xs">
                  <Col xs={12}>
                    <ExpandAllButton
                      accordionStatus={sections}
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
                  accordionStatus={sections}
                  onToggle={toggleSection}
                >
                  {metadata &&
                    <Accordion
                      id={SUBMISSION_SECTIONS.summarySection}
                      label={SUBMISSION_SECTION_LABELS[SUBMISSION_SECTIONS.summarySection]}
                    >
                      <ViewMetaData metadata={metadata} />

                    </Accordion>
                  }
                  <Accordion
                    id={SUBMISSION_SECTIONS.bibInfoSection}
                    label={SUBMISSION_SECTION_LABELS[SUBMISSION_SECTIONS.bibInfoSection]}
                  >
                    <SubmissionBibinfoForm />
                  </Accordion>
                  <Accordion
                    id={SUBMISSION_SECTIONS.pubInfoSection}
                    label={SUBMISSION_SECTION_LABELS[SUBMISSION_SECTIONS.pubInfoSection]}
                  >
                    <SubmissionPubinfoForm />
                  </Accordion>
                  <Accordion
                    id={SUBMISSION_SECTIONS.locationSection}
                    label={SUBMISSION_SECTION_LABELS[SUBMISSION_SECTIONS.locationSection]}
                  >
                    <SubmissionLocationForm />
                  </Accordion>
                </AccordionSet>
              </Col>
            </Row>

          </Pane>
        </Paneset>
      </HasCommand>
    </form>
  );

};


SubmissionForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  cancelForm: PropTypes.func.isRequired,
  paneTitle: PropTypes.node,
  values: PropTypes.object,
  form: PropTypes.object,
};

SubmissionForm.defaultProps = {
  paneTitle: <FormattedMessage id="ui-ill-ra.submission.create.title" />,
};

export default stripesForm({
  keepDirtyOnReinitialize: true,
  navigationCheck: true,
  subscription: { values: true },
  validateOnBlur: true,
})(SubmissionForm);

