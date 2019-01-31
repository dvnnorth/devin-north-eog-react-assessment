import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import navLinks from '../navLinks';

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

const NavContent = props => {
  const { classes } = props;
  return (
    <List>
      {navLinks.map((navLink, i) => (
        <div key={i}>
          <Link to={navLink.path} style={{ 'text-decoration': 'none' }}>
            <ListItem button selected={props.selectedIndex === i}>
              <ListItemIcon>
                {(() => {
                  switch (navLink.icon) {
                    case 'dashboard':
                      return (
                        <DashboardIcon
                          nativeColor={
                            props.selectedIndex === i ? 'white' : 'primary'
                          }
                        />
                      );
                    case 'map':
                      return (
                        <MapIcon
                          nativeColor={
                            props.selectedIndex === i ? 'white' : 'primary'
                          }
                        />
                      );
                    case 'show_chart':
                      return (
                        <ShowChartIcon
                          nativeColor={
                            props.selectedIndex === i ? 'white' : 'primary'
                          }
                        />
                      );
                    default:
                      return (
                        <FiberManualRecordIcon
                          nativeColor={
                            props.selectedIndex === i ? 'white' : 'primary'
                          }
                        />
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
};

export default withStyles(styles)(NavContent);
