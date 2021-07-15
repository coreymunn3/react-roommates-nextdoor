import React, { Fragment } from 'react';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Circle,
} from 'react-google-maps';
import { FaSpinner } from 'react-icons/fa';

const Map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places"`,
    loadingElement: (
      <div style={{ height: '100%' }}>
        <FaSpinner />
      </div>
    ),
    containerElement: <div style={{ height: `400px`, marginBottom: '1rem' }} />,
    mapElement: <div style={{ height: `100%`, borderRadius: '20px' }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap defaultZoom={props.zoom} defaultCenter={props.center}>
    <Fragment>
      <Circle
        defaultCenter={props.center}
        radius={props.radius}
        options={props.options}
      />
    </Fragment>
  </GoogleMap>
));

export default Map;

// official docs
// https://tomchentw.github.io/react-google-maps/#usage--configuration
