import React from 'react';
import { Router } from 'react-router-dom';
import {
  render,
  cleanup,
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { FormattedMessage } from 'react-intl';

import '../../test/jest/__mock__';
import SomeFeatureSettings from './some-feature-settings';

const label = <FormattedMessage id="ui-ill.settings.some-feature" />;

const renderSomeFeatureSettingsPage = () => {
  const history = createMemoryHistory();
  return render(
    <Router history={history}>
      <SomeFeatureSettings
        label={label}
      />
    </Router>
  );
};

describe('Some Feature Settings Page', () => {
  let page;

  beforeEach(() => {
    page = renderSomeFeatureSettingsPage();
  });

  afterEach(cleanup);

  it('should be rendered', () => {
    const { container } = page;
    const content = container.querySelector('[data-test-application-settings-feature-message]');
    expect(container).toBeVisible();
    expect(content).toBeVisible();
    expect(content.innerHtml).toEqual(label.innerHtml);
  });
});
