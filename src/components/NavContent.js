import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import navLinks from '../navLinks';
import * as actions from '../store/actions';

// Icons
import DashboardIcon from '@material-ui/icons/Dashboard';
import MapIcon from '@material-ui/icons/Map';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const styles = () => ({
  linkText: {
    paddingTop: 10,
    paddingBottom: 10,
    color: '#fff',
    textShadow: '0px 1px 1px rgba(0, 0, 0, 1)'
  }
});

class NavContent extends Component {
  render() {
    const { classes } = this.props;
    return (
      <List>
        {navLinks.map((navLink, i) => (
          <div key={i}>
            <Link to={navLink.path} style={{ textDecoration: 'none' }}>
              <ListItem
                button
                selected={this.props.selectedIndex === i}
                onClick={() => {
                  this.props.setSelectedIndex(i);
                }}
              >
                <ListItemIcon>
                  {(() => {
                    const nativeColor =
                      this.props.selectedIndex === i ? 'white' : 'primary';
                    switch (navLink.icon) {
                      case 'dashboard':
                        return <DashboardIcon nativeColor={nativeColor} />;
                      case 'map':
                        return <MapIcon nativeColor={nativeColor} />;
                      case 'show_chart':
                        return <ShowChartIcon nativeColor={nativeColor} />;
                      default:
                        return (
                          <FiberManualRecordIcon nativeColor={nativeColor} />
                        );
                    }
                  })()}
                </ListItemIcon>
                <ListItemText
                  children={
                    <Typography
                      variant="h6"
                      color="primary"
                      className={classes.linkText}
                    >
                      {navLink.name}
                    </Typography>
                  }
                />
              </ListItem>
            </Link>
            <Divider />
          </div>
        ))}
      </List>
    );
  }
}

const mapStateToProps = state => {
  const { selectedIndex } = state.navContent;
  return {
    selectedIndex
  };
};

const mapDispatchToProps = dispatch => ({
  setSelectedIndex: index => {
    dispatch({
      type: actions.UPDATE_SELECTED_LINK,
      index
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(NavContent));
