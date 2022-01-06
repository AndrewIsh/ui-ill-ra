import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router-dom';

import {
  PaneMenu,
  Button,
} from '@folio/stripes/components';
import { IfPermission } from '@folio/stripes/core';

import { SUBMISSION_CREATE_ROUTE  } from '../../common/constants';

const SubmissionsListLastMenu = () => {
  const { search } = useLocation();

  return (
    <IfPermission perm="ui-ill-ra.submission.create">
      <PaneMenu>
        <FormattedMessage id="stripes-smart-components.addNew">
          {ariaLabel => (
            <Button
              id="clickable-newsubmission"
              aria-label={ariaLabel}
              to={{
                pathname: SUBMISSION_CREATE_ROUTE,
                search,
              }}
              buttonStyle="primary"
              marginBottom0
            >
              <FormattedMessage id="stripes-smart-components.new" />
            </Button>
          )}
        </FormattedMessage>
      </PaneMenu>
    </IfPermission>
  );
};

export default SubmissionsListLastMenu;
