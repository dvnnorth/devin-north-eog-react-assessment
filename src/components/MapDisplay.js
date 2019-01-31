import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeaderRaw from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Map from './Map';
import { withStyles, withTheme } from '@material-ui/core/styles';
import * as actions from '../store/actions';
import { compose } from 'recompose';
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
  toolbar: theme.mixins.toolbar
});

class MapDisplay extends Component {
  componentDidMount() {
    this.delayedShowMarker();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  };

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
  };
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader title="Map" />
        <CardContent>
          <Map isMarkerShown={true} />
        </CardContent>
      </Card>
    );
  }
}

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
  )(MapDisplay)
);
