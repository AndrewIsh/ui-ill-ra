import React from 'react';
import { Router } from 'react-router-dom';
import {
  render,
  cleanup,
} from '@testing-library/react';
import { createMemoryHistory } from 'history';

import '../../test/jest/__mock__';
import Application from './application';

const renderApplicationPage = () => {
  const history = createMemoryHistory();
  return render(
    <Router history={history}>
      <Application match={{ 'path': 'example-page' }} />
    </Router>
  );
};

describe('Application Page', () => {
  let page;

  beforeEach(() => {
    page = renderApplicationPage();
  });

  afterEach(cleanup);

  it('should be rendered', () => {
    const { container } = page;
    const content = container.querySelector('[data-test-application-examples]');
    expect(container).toBeVisible();
    expect(content).toBeVisible();
  });
});
