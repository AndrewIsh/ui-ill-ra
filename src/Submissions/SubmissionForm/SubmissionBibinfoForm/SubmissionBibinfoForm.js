import React, { useState } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import { Field } from 'react-final-form'

import {
  Col,
  Row,
  TextField
} from '@folio/stripes/components';

import {
  validFields
} from '../../../common/constants';

import IdentifierPicker from './IdentifierPicker';

// A 2D array representing the row & column layout and what
// field is displayed in which
const layout = [
  ['Title', 'Author', 'Subtitle', 'SeriesTitle'],
  ['Edition', 'TitleOfComponent', 'AuthorOfComponent', 'Volume'],
  ['Issue', 'PagesRequested', 'EstimatedNoPages', 'SELECT_BibliographicItemId'],
  ['Sponsor', 'InformationSource', 'SELECT_BibliographicRecordId']
];

const PickerField = props => {
  const { code, value } = validFields[props.id];
  const iValue = props.input.value;
  // Create a string to display in the input
  const str = iValue && Array.isArray(iValue) ?
    // Fairly convoluted, we're making sure incomplete fields
    // are not displayed
    iValue.map(i => {
      const codeVal = i[code];
      const valueVal = i[value];
      if (codeVal.length > 0 && valueVal.length > 0) {
        return `${codeVal}: ${valueVal}`
      }
    }).filter(x => x).join(', ') :
    '';
  return <TextField value={str} {...props} />
};

const BibField = ({ fieldName, onClick, component }) => {
  return (<Field
    component={component}
    fullWidth
    onClick={onClick}
    id={fieldName}
    label={<FormattedMessage id={`ui-ill-components.iso18626.bibInfo.${fieldName}`} />}
    name={`submissionMetadata.BibliographicInfo.${fieldName}`}
    validateFields={[]}
  />)
};

const SubmissionBibinfoForm = () => {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerField, setPickerField] = useState();

  const intl = useIntl();

  const getCol = ({ col }) => {
    const fieldName = col.replace(/SELECT_/, '');
    let onClick = null
    let component = TextField;
    if (/SELECT_/.test(col)) {
      onClick = () => {
        setPickerField(fieldName);
        setPickerOpen(true);
      }
      component = PickerField;
    }
    return (
      <Col key={fieldName} xs={6} md={3}>
        <BibField
          fieldName={fieldName}
          onClick={onClick}
          component={component}
        />
      </Col>
    );
  };

  const getRows = () => layout.map((row, index) => <Row key={index}>
    {row.map(col => getCol({ col }))}
  </Row>
  );

  return (
    <>
      {pickerOpen && (
        <IdentifierPicker
          open={pickerOpen}
          setOpen={setPickerOpen}
          fieldName={pickerField}
          label={intl.formatMessage({ id: `ui-ill-components.iso18626.bibInfo.${pickerField}` })}
          toUpdate={`submissionMetadata.BibliographicInfo.${pickerField}`}
        />
      )}
      { getRows() }
    </>
  );
};

export default SubmissionBibinfoForm;
