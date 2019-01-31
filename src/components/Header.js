import React from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Weather from './Weather';

const drawerWidth = 240;

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  }
});

const Header = props => {
  const { classes } = props;
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          className={classes.grow}
          noWrap
        >
          Devin North's EOG React Assessment
        </Typography>
        <Weather />
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = state => {
  const { drawerOpen } = state.navContent;
  return {
    drawerOpen
  };
};

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(Header));
