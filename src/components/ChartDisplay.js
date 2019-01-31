import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeaderRaw from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Plot from 'react-plotly.js';
import * as actions from '../store/actions';

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
  graph: {
    height: '100%',
    width: '100%'
  },
  grid: {
    paddingTop: 50
  },
  card: {
    margin: '5% 25%'
  },
  toolbar: theme.mixins.toolbar
});

const ChartDisplay = props => {
  if (props.selectedIndex !== 2) {
    props.setSelectedLink(2);
  }
  const { classes } = props;
  const xData = props.droneData.map(data =>
    moment(data.timestamp).format('kk:mm:ss')
  );
  const yData = props.droneData.map(data => data.metric);
  return (
    <Grid container className={classes.grid}>
      <Grid item xs={12}>
        <Card className={classes.card}>
          <CardHeader title="Chart" />
          <CardContent>
            <Plot
              className={classes.graph}
              data={[
                {
                  x: xData,
                  y: yData,
                  type: 'linear',
                  marker: { color: 'gray' }
                }
              ]}
              layout={{
                xaxis: {
                  autotick: false,
                  dtick: 50
                },
                margin: {
                  l: 20,
                  r: 20,
                  t: 20,
                  b: 20
                }
              }}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => {
  const { selectedIndex } = state.navContent;
  const { droneData } = state.drone;
  return {
    droneData: droneData.data,
    selectedIndex
  };
};

const mapDispatchToProps = dispatch => ({
  setSelectedLink: index => {
    dispatch({
      type: actions.UPDATE_SELECTED_LINK,
      index
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ChartDisplay));
