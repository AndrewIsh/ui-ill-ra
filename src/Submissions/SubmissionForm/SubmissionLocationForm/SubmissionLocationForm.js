import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Field } from 'react-final-form';

import { LocationLookup, LocationSelection } from '@folio/stripes/smart-components';

import {
  validateRequired,
} from '@folio/stripes-acq-components';

import {
  Col,
  Row,
} from '@folio/stripes/components';

const SubmissionLocationForm = () => (
  <Row>
    <Col xs={12}>
      <Field
        name="submissionLocation"
        label={<FormattedMessage id="ui-ill-ra.submission.metadata.location" />}
        required
        validate={validateRequired}
        validateFields={[]}
      >
        {(props) => {
          // We pass all props to LocationSelection. It might seem strange to pass "input"
          // but seemingly validation breaks if we fail to pass input.onBlur, so I'm not
          // going to argue...
          return <>
            <LocationSelection
              onSelect={(selectedValue) => props.input.onChange(selectedValue?.id || '')}
              {...props}
            />
            <LocationLookup onLocationSelected={(selectedValue) => props.input.onChange(selectedValue?.id || '')} />
          </>;
        }}
      </Field>
    </Col>
  </Row>
);

export default SubmissionLocationForm;
