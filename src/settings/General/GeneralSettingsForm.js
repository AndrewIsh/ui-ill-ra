import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Button,
  Pane,
  TextField,
  Select
} from '@folio/stripes/components';

import stripesFinalForm from '@folio/stripes/final-form';

const GeneralSettingsForm = ({
  handleSubmit,
  label,
  pristine,
  submitting
}) => {
  const intl = useIntl();

  return (
    <form id="ui-ill-ra-general-settings-form" onSubmit={handleSubmit}>
      <Pane
        defaultWidth="fill"
        fluidContentWidth
        id="pane-ui-ill-ra-settings-display"
        lastMenu={(
          <Button
            buttonStyle="primary"
            disabled={pristine || submitting}
            id="clickable-save-ui=ill-ra-settings"
            marginBottom0
            type="submit"
          >
            <FormattedMessage id="ui-ill-ra.button.save" />
          </Button>
        )}
        paneTitle={label}
      >
        <Field
          component={Select}
          placeholder={intl.formatMessage({ id: "ui-ill-ra.settings.selectRequestingAgencyIdType" })}
          dataOptions={[
            { value: 'ISIL', label: 'ISIL' }
          ]}
          id="ui-ill-ra-settings-requestingAgencyIdType"
          label={<FormattedMessage id="ui-ill-ra.settings.requestingAgencyIdType" />}
          name="requestingAgencyIdType"
        />
        <Field
          component={TextField}
          id="ui-ill-ra-settings-requestingAgencyIdValue"
          label={<FormattedMessage id="ui-ill-ra.settings.requestingAgencyIdValue" />}
          name="requestingAgencyIdValue"
          type="text"
        />
      </Pane>
    </form>
  );
};

GeneralSettingsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  label: PropTypes.node,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  values: PropTypes.shape({
    requestingAgencyIdType: PropTypes.string,
    requestingAgencyIdValue: PropTypes.string
  })
};

export default stripesFinalForm({
  navigationCheck: true,
  enableReinitialize: true,
  subscription: {
    values: true
  }
})(GeneralSettingsForm);
