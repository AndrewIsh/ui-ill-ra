import React from 'react';
import { Router } from 'react-router-dom';
import {
  render,
  cleanup,
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { FormattedMessage } from 'react-intl';

import '../../test/jest/__mock__';
import Settings from './general-settings';

const label = <FormattedMessage id="ui-ill.settings.general" />;

const renderSettingsPage = () => {
  const history = createMemoryHistory();
  return render(
    <Router history={history}>
      <Settings
        label={label}
      />
    </Router>
  );
};

describe('General Settings Page', () => {
  let page;

  beforeEach(() => {
    page = renderSettingsPage();
  });

  afterEach(cleanup);

  it('should be rendered', () => {
    const { container } = page;
    const content = container.querySelector('[data-test-application-settings-general-message]');
    expect(container).toBeVisible();
    expect(content).toBeVisible();
    expect(content.innerHtml).toEqual(label.innerHtml);
  });
});
