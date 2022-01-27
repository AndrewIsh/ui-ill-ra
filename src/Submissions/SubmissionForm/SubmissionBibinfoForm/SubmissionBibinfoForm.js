import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import { Field } from 'react-final-form'

import {
  Col,
  Row,
  TextField
} from '@folio/stripes/components';

// A 2D array representing the row & column layout and what
// field is displayed in which
const layout = [
  ['Title', 'Author', 'Subtitle', 'SeriesTitle'],
  ['Edition', 'TitleOfComponent', 'AuthorOfComponent', 'Volume'],
  ['Issue', 'PagesRequested', 'EstimatedNoPages', 'Sponsor']
];

const getCol = ({ col }) => {
  return (
    <Col key={col} xs={6} md={3}>
      <Field
        component={TextField}
        fullWidth
        id={col}
        label={<FormattedMessage id={`ui-ill-components.iso18626.bibInfo.${col}`} />}
        name={`submissionMetadata.BibliographicInfo.${col}`}
        validateFields={[]}
      />
    </Col>
  )
};

const getRows = () => layout.map((row, index) => <Row key={index}>
  {row.map(col => getCol({ col }))}
</Row>
);

const SubmissionBibinfoForm = () => {
  return getRows();
};

SubmissionBibinfoForm.propTypes = {
};

export default SubmissionBibinfoForm;
