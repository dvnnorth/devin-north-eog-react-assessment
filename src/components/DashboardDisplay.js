import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeaderRaw from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import AvatarRaw from '@material-ui/core/Avatar';
import * as actions from '../store/actions';

// Icons
import WhatshotIcon from '@material-ui/icons/Whatshot';
import MapIcon from '@material-ui/icons/Map';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

const cardStyles = theme => ({
  root: {
    background: theme.palette.primary.main
  },
  title: {
    color: 'white'
  }
});
const CardHeader = withStyles(cardStyles)(CardHeaderRaw);

const avatarStyles = theme => ({
  root: {
    background: theme.palette.primary.main
  }
});
const Avatar = withStyles(avatarStyles)(AvatarRaw);

const styles = theme => ({
  grid: {
    paddingTop: 50
  },
  card: {
    margin: '5% 25%'
  },
  toolbar: theme.mixins.toolbar
});

const DashboardDisplay = props => {
  const { classes } = props;
  let displayUoM = (uom => {
    switch (uom) {
      case 'temperature - fahrenheit':
        return '° F';
      case 'temperature - celsius':
        return '° C';
      case 'temperature - kelvin':
        return '° K';
      default:
        return '°';
    }
  })(props.lastUoM);

  const displayTemp = (
    <ListItemText
      primary="Temperature:"
      secondary={props.lastTemperature + displayUoM}
    />
  );
  const latitude = (
    <ListItemText primary="Latitude:" secondary={props.lastPosition[0]} />
  );
  const longitude = (
    <ListItemText primary="Longitude:" secondary={props.lastPosition[1]} />
  );
  const lastReceived = (
    <ListItemText
      primary="Last Received:"
      secondary={`${Math.round(
        (Date.now() - props.lastTimestamp) / 1000
      )} seconds ago`}
    />
  );
  return (
    <Grid container className={classes.grid}>
      <Grid item xs={12}>
        <Card className={classes.card}>
          <CardHeader title="Dashboard" />
          <CardContent>
            <List>
              <ListItem>
                <Avatar>
                  <WhatshotIcon />
                </Avatar>
                {displayTemp}
              </ListItem>
              <ListItem>
                <Avatar>
                  <MapIcon />
                </Avatar>
                {latitude}
              </ListItem>
              <ListItem>
                <Avatar>
                  <MapIcon />
                </Avatar>
                {longitude}
              </ListItem>
              <ListItem>
                <Avatar>
                  <AccessTimeIcon />
                </Avatar>
                {lastReceived}
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => {
  const { selectedIndex } = state.navContent;
  return {
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
)(withStyles(styles)(DashboardDisplay));
