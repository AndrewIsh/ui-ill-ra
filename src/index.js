import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import { hot } from 'react-hot-loader';

import { Submissions } from './Submissions';
import Settings from './settings';
import { SUBMISSIONS_ROUTE } from './common/constants';

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
          path={SUBMISSIONS_ROUTE}
          component={Submissions}
        />
      </Switch>
    );
  }
}

export default hot(module)(Ill);
