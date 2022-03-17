import React from 'react';
import { FormattedMessage } from 'react-intl';
import { isEmpty } from 'lodash';

import { stripesConnect } from '@folio/stripes/core';
import { ConfigManager as UnconnectedConfigManager } from '@folio/stripes/smart-components';

import GeneralSettingsForm from './GeneralSettingsForm';

const ConfigManager = stripesConnect(UnconnectedConfigManager);

const getInitialValues = (settings) => {
  let config;
  const value = isEmpty(settings) ? '' : settings[0].value;
  const defaultConfig = {
    requestingAgencyIdType: '',
    requestingAgencyIdValue: ''
  };

  try {
    config = { ...defaultConfig, ...JSON.parse(value) };
  } catch (e) {
    config = defaultConfig;
  }

  return config;
};

const General = () => (
  <ConfigManager
    configFormComponent={GeneralSettingsForm}
    configName="generalSettings"
    getInitialValues={getInitialValues}
    label={<FormattedMessage id="ui-ill-ra.settings.general" />}
    moduleName="UI-ILL-RA"
    onBeforeSave={JSON.stringify}
  />
);

export default General;
