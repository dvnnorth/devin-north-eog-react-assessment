import React from 'react';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';
import { connect } from 'react-redux';

const Map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
      process.env.REACT_APP_MAPS_API_KEY
    }&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  console.log(process.env.REACT_APP_MAPS_API_KEY);
  return (
    <GoogleMap defaultZoom={5} defaultCenter={{ lat: 29.76, lng: -95.37 }}>
      {props.isMarkerShown && (
        <Marker
          position={{ lat: props.lastPosition[0], lng: props.lastPosition[1] }}
        />
      )}
    </GoogleMap>
  );
});

const mapStateToProps = state => {
  const { lastPosition } = state.drone;
  return {
    lastPosition
  };
};

export default connect(
  mapStateToProps,
  null
)(Map);
