import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeaderRaw from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import moment from 'moment';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Plot from 'react-plotly.js';

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
  toolbar: theme.mixins.toolbar
});

const ChartDisplay = props => {
  const { classes } = props;
  const xData = props.droneData.map(data =>
    moment(data.timestamp).format('h:mm:ss')
  );
  const yData = props.droneData.map(data => data.metric);
  return (
    <Card className={classes.card}>
      <CardHeader title="Chart" />
      <CardContent>
        <Plot
          data={[
            {
              x: xData,
              y: yData,
              type: 'linear',
              marker: { color: 'gray' }
            }
          ]}
          layout={{
            width: '100%',
            height: 300,
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
  );
};

const mapStateToProps = state => {
  const { droneData } = state.drone;
  return {
    droneData: droneData.data
  };
};

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(ChartDisplay));
