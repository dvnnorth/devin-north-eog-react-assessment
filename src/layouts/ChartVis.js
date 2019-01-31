import React, { Component } from 'react';

import ChartDisplay from '../components/ChartDisplay';

import * as actions from '../store/actions';
import { connect } from 'react-redux';

class ChartVis extends Component {
  constructor(props) {
    super(props);
    setInterval(props.getData, 5000);
  }

  render() {
    return <ChartDisplay {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartVis);
