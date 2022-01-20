import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import { hot } from 'react-hot-loader';

import { Submissions } from './Submissions';
import { Requests } from './Requests';
import Settings from './settings';
import {
  ROOT,
  SUBMISSIONS_ROUTE,
  REQUESTS_ROUTE
} from './common/constants';

class Ill extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    showSettings: PropTypes.bool,
    stripes: PropTypes.shape({
      connect: PropTypes.func
    })
  };
  render() {
    const { showSettings } = this.props;

    if (showSettings) {
      return <Settings {...this.props} />;
    }
    return (
      <Switch>
        <Route
          exact
          path={ROOT}
        >
          <Redirect to={{ pathname: SUBMISSIONS_ROUTE }} />
        </Route>
        <Route
          path={SUBMISSIONS_ROUTE}
          component={Submissions}
        />
        <Route
          path={REQUESTS_ROUTE}
          component={Requests}
        />
      </Switch>
    );
  }
}

export default hot(module)(Ill);
