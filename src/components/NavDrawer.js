import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import NavContent from './NavContent';

const drawerWidth = 240;

const styles = theme => ({
  drawerPaper: {
    width: drawerWidth,
    ...theme.addHeaderPadding,
    paddingLeft: 10,
    paddingRight: 10,
    background: 'linear-gradient(to right bottom, #2eccd4, #3192c8)'
  },
  navText: {
    color: '#fff !important',
    textShadow: '0px 1px 1px rgba(0, 0, 0, 1)'
  }
});

class NavDrawer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <NavContent {...this.props} />
      </Drawer>
    );
  }
}

NavDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const { selectedIndex } = state.navContent;
  return { selectedIndex };
};

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(NavDrawer));
