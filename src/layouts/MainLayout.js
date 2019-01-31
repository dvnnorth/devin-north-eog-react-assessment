import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NavContent from '../components/NavContent';
import Header from '../components/Header';
import { ToastContainer } from 'react-toastify';
import { compose } from 'recompose';
import { withTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import * as actions from '../store/actions';

// Route Layouts
import View from './View';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    background: 'linear-gradient(to right bottom, #2eccd4, #3192c8) !important',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    background: 'linear-gradient(to right bottom, #2eccd4, #3192c8) !important',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: 8,
    paddingRight: 8,
    ...theme.addHeaderPadding,
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
});

class MainLayout extends React.Component {
  handleDrawerOpen = () => {
    this.props.openDrawer();
  };

  handleDrawerClose = () => {
    this.props.closeDrawer();
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header handleDrawerOpen={this.handleDrawerOpen} />
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.props.drawerOpen,
            [classes.drawerClose]: !this.props.drawerOpen
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.props.drawerOpen,
              [classes.drawerClose]: !this.props.drawerOpen
            })
          }}
          open={this.props.drawerOpen}
        >
          <div className={classes.toolbar}>
            <IconButton
              onClick={
                this.props.drawerOpen
                  ? this.handleDrawerClose
                  : this.handleDrawerOpen
              }
            >
              {this.props.drawerOpen ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <NavContent />
        </Drawer>
          <View />
          <ToastContainer />
      </div>
    );
  }
}

MainLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const { selectedIndex, drawerOpen } = state.navContent;
  return {
    selectedIndex,
    drawerOpen
  };
};

const mapDispatchToProps = dispatch => ({
  openDrawer: () => {
    dispatch({
      type: actions.OPEN_DRAWER
    });
  },
  closeDrawer: () => {
    dispatch({
      type: actions.CLOSE_DRAWER
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  compose(
    withTheme(),
    withStyles(styles)
  )(MainLayout)
);
