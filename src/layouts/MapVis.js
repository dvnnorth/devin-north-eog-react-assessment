import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeaderRaw from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import MapDisplay from '../components/MapDisplay';
import { withStyles } from '@material-ui/core/styles';
import * as actions from '../store/actions';
import { connect } from 'react-redux';

const cardStyles = theme => ({
  root: {
    background: theme.palette.primary.main
  },
  title: {
    color: 'white'
  }
});
const CardHeader = withStyles(cardStyles)(CardHeaderRaw);

const styles = theme => ({
  card: {
    margin: '5% 25%'
  },
  content: {
    ...theme.addHeaderPadding,
    paddingLeft: 240,
    minWidth: 0 // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar
});

class MapVis extends Component {
  constructor(props) {
    super(props);
    setInterval(props.getData, 5000);
    if(props.selectedIndex !== 0) {
      props.setSelectedIndex(1);
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.content}>
        <Card className={classes.card}>
          <CardHeader title="Map" />
          <CardContent>
            <MapDisplay />
          </CardContent>
        </Card>
      </main>
    );
  }
}

const mapStateToProps = state => {
  const { lastPosition, lastTemperature, lastUoM, lastTimestamp } = state.drone;
  return {
    lastPosition,
    lastTemperature,
    lastUoM,
    lastTimestamp
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
)(withStyles(styles)(MapVis));
