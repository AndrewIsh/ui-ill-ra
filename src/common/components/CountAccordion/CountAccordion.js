import React, {
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { get } from 'lodash';

import {
  Accordion,
  Headline,
  Badge,
  Button
} from '@folio/stripes-components';

const CountAccordion = ({
  children,
  count,
  id,
  label,
  onToggle,
  headerProps
}) => {

  const getCount = useCallback(
    (count) => {
      return (
        <Badge>
          <span data-test-count-accordion-count-indicator>
            {count}
          </span>
      </Badge>
      );
    },
    [count],
  );

  return <Accordion
    id={id}
    label={label}
    displayWhenClosed={getCount(count)}
    onToggle={onToggle}
    headerProps={headerProps}
  >
    {children}
  </Accordion>
};

CountAccordion.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  count: PropTypes.number,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onToggle: PropTypes.func,
  headerProps: PropTypes.object
};

CountAccordion.defaultProps = {
  count: 0,
  open: false
};

export default CountAccordion;
