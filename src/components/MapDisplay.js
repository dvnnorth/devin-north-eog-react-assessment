import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
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
  grid: {
    paddingTop: 50
  },
  card: {
    margin: '5% 25%'
  },
  toolbar: theme.mixins.toolbar
});

class MapDisplay extends Component {
  componentDidMount() {
    this.delayedShowMarker();
    if (this.props.selectedIndex !== 1) {
      this.props.setSelectedLink(1);
    }
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
      <Grid container className={classes.grid}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardHeader title="Map" />
            <CardContent>
              <Map isMarkerShown={true} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
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
)(
  compose(
    withTheme(),
    withStyles(styles)
  )(MapDisplay)
);
