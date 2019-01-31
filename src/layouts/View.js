import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import DashboardDisplay from '../components/DashboardDisplay';
import MapDisplay from '../components/MapDisplay';
import ChartDisplay from '../components/ChartDisplay';
import FourOhFour from '../components/FourOhFour';

import * as actions from '../store/actions';
import { connect } from 'react-redux';

class View extends Component {
  constructor(props) {
    super(props);
    setInterval(props.getData, 5000);
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => <DashboardDisplay {...this.props} />}
        />
        <Route path="/map" render={() => <MapDisplay {...this.props} />} />
        <Route path="/chart" render={() => <ChartDisplay {...this.props} />} />
        <Route component={FourOhFour} />
      </Switch>
    );
  }
}

const mapStateToProps = state => {
  const { lastPosition, lastTemperature, lastUoM, lastTimestamp } = state.drone;
  const { selectedIndex, drawerWidth } = state.navContent;
  return {
    lastPosition,
    lastTemperature,
    lastUoM,
    lastTimestamp,
    selectedIndex,
    drawerWidth
  };
};

const mapDispatchToProps = dispatch => ({
  getData: () =>
    dispatch({
      type: actions.UPDATE_DRONE
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
