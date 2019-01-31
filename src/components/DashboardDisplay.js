import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeaderRaw from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import AvatarRaw from '@material-ui/core/Avatar';

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
  card: {
    margin: '5% 25%'
  },
  content: {
    ...theme.addHeaderPadding,
    paddingLeft: 240,
    minWidth: 0 // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
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
    <main className={classes.content}>
      <Card className={classes.card}>
        <CardHeader title="Dashboard" />
        <CardContent>
          <List>
            <ListItem>
              <Avatar>1</Avatar>
              {displayTemp}
            </ListItem>
            <ListItem>
              <Avatar>2</Avatar>
              {latitude}
            </ListItem>
            <ListItem>
              <Avatar>3</Avatar>
              {longitude}
            </ListItem>
            <ListItem>
              <Avatar>4</Avatar>
              {lastReceived}
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </main>
  );
};

export default withStyles(styles)(DashboardDisplay);
