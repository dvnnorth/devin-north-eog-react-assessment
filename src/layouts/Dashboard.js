import React, { Component } from 'react';

import DashboardDisplay from '../components/DashboardDisplay';

import * as actions from '../store/actions';
import { connect } from 'react-redux';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    setInterval(props.getData, 5000);
    if(props.selectedIndex !== 0) {
      props.setSelectedIndex(0);
    }
  }

  render() {
    return <DashboardDisplay {...this.props} />;
  }
}

const mapStateToProps = state => {
  const { lastPosition, lastTemperature, lastUoM, lastTimestamp } = state.drone;
  const { selectedIndex } = state.navContent;
  return {
    lastPosition,
    lastTemperature,
    lastUoM,
    lastTimestamp,
    selectedIndex
  };
};

const mapDispatchToProps = dispatch => ({
  getData: () =>
    dispatch({
      type: actions.UPDATE_DRONE
    }),
  setSelectedIndex: index =>
    dispatch({
      type: actions.UPDATE_SELECTED_LINK,
      index
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
