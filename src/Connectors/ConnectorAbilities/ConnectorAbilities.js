import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { Icon } from '@folio/stripes/components';

import css from './ConnectorAbilities.css';

const ConnectorAbilities = ({ connector }) => {

  const intl = useIntl();

  const icons = {
    'ill-connector-search': {
      icon: 'search',
      label: 'ui-ill-ra.connector.ability.canSearch'
    }
  };

  const getIcons = () => {
    return connector.abilities.map(ability => {
      if (!icons.hasOwnProperty(ability)) return null;
      const { icon, label } = icons[ability];
      return <Icon
        key={icon}
        size="medium"
        icon={icon}
        aria-label={intl.formatMessage({ id: label })}
        iconRootClass={css.icon}
      />;
    });
  }

  return <>{getIcons()}</>;
};

ConnectorAbilities.propTypes = {
  connector: PropTypes.object.isRequired
};

ConnectorAbilities.defaultProps = {
  connector: {}
};

export default ConnectorAbilities;
