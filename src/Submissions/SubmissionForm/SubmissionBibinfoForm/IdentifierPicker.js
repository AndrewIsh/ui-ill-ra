import React from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import {
  Button,
  Modal,
  RepeatableField,
  Row,
  Col,
  Select,
  TextField
} from '@folio/stripes/components';

import {
  BibliographicItemIdentifierCode,
  BibliographicRecordIdentifierCode,
  validFields
} from '../../../common/constants';

const IdentifierPicker = ({
  open,
  setOpen,
  fieldName,
  label,
  toUpdate
}) => {
  if (!Object.keys(validFields).includes(fieldName)) return null;

  const intl = useIntl();

  const selectValues = {
    BibliographicRecordIdentifierCode: BibliographicRecordIdentifierCode.map(i => ({ label: i, value: i })),
    BibliographicItemIdentifierCode: BibliographicItemIdentifierCode.map(i => ({ label: i, value: i }))
  };

  const empty = {
    [validFields[fieldName].code]: '',
    [validFields[fieldName].value]: ''
  };

  const codeField = validFields[fieldName].code;
  const valueField = validFields[fieldName].value;


  const modalFooter = (
    <Button onClick={() => setOpen(false)}>
      <FormattedMessage id="ui-ill-ra.button.saveAndClose" />
    </Button>
  );

  return (
    <Modal
      aria-label={intl.formatMessage({ id: 'ui-ill-ra.submission.identifier.add' }, { identifierType: label })}
      dismissible
      closeOnBackgroundClick
      open={open}
      onClose={() => setOpen(false)}
      label={label}
      footer={modalFooter}
    >
      <FieldArray
        addLabel={<FormattedMessage id={`ui-ill-ra.submission.identifier.add`} values={{ identifierType: label }} />}
        component={RepeatableField}
        name={toUpdate}
        onAdd={toAdd => toAdd.push(empty)}
        renderField={field => (
          <Row>
            <Col xs={6}>
              <Field
                placeholder={intl.formatMessage({ id: 'ui-ill-ra.submission.identifier.selectCode' })}
                required
                component={Select}
                dataOptions={selectValues[codeField]}
                label={<FormattedMessage id={`ui-ill-components.iso18626.bibInfo.${codeField}`} />}
                name={`${field}.${codeField}`}
              />
            </Col>
            <Col xs={6}>
              <Field
                required
                component={TextField}
                label={<FormattedMessage id={`ui-ill-components.iso18626.bibInfo.${valueField}`} />}
                name={`${field}.${valueField}`}
              />
            </Col>
          </Row>
        )}
      />
    </Modal>
  );

};

export default IdentifierPicker;
