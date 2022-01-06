import React from 'react';
import { FormattedMessage } from 'react-intl';

import { ERROR_CODE_GENERIC } from '@folio/stripes-acq-components';

export const handleSaveErrorResponse = async (intl, showCallout, response) => {
  let responseJson = null;

  try {
    responseJson = await response.json();
  } catch (e) {
    responseJson = {};
  }

  const errorCode = responseJson.errors?.[0]?.code || ERROR_CODE_GENERIC;
  const errorMsg = responseJson.errors?.[0]?.message;
  const message = (
    <FormattedMessage
      id={`ui-ill-ra.save.error.${errorCode}`}
      defaultMessage={intl.formatMessage({ id: `ui-ill-ra.save.error.${ERROR_CODE_GENERIC}` })}
    />
  );

  showCallout({
    message,
    type: 'error',
  });

  if (errorMsg) {
    showCallout({
      message: errorMsg,
      type: 'error',
    });
  }
};
