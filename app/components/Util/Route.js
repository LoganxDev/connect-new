import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {lineString as makeLineString} from '@turf/helpers';
import nearestPointOnLine from '@turf/nearest-point-on-line';
import {point} from '@turf/helpers';
import Geolocation from '@react-native-community/geolocation';

export default Route = ({route}) => {
  const [position, setPosition] = useState(null);
  const [progressLine, setProgressLine] = useState(null);
  const [routeString, setRouteString] = useState(null);
  const [endCoord, setEndCoord] = useState(null);

  const tick = () => {
    Geolocation.getCurrentPosition(
      (pos) => {
        setPosition(pos);
      },
      (error) => Alert.alert('Error', JSON.stringify(error)),
    );

    setTimeout(() => tick(), 10000);
  };

  useEffect(() => {
    tick();
  }, []);

  useEffect(() => {
    if (!route || !routeString) return;
    // draw a line from starting position to the current position
    // find the closest coord in route to current position
    let userPt = point([position.coords.longitude, position.coords.latitude]);
    const closestPoint = nearestPointOnLine(routeString, userPt);
    // make a line out of those coords
    let coords = [];
    let i = 0;
    for (coord of route.geometry.coordinates) {
      coords.push(coord);
      // if (coord[0].toFixed(4) === closestPoint.geometry.coordinates[0].toFixed(4) &&
      //   coord[1].toFixed(4) === closestPoint.geometry.coordinates[1].toFixed(4)) {
      //   break;
      // }
      i++;
      if (i == 5) {
        break;
      }
    }
    if (coords.length > 0) {
      const lineString = makeLineString(coords);
      setProgressLine(lineString);
    }
  }, [position]);

  useEffect(() => {
    if (!route) return;
    setRouteString(makeLineString(route.geometry.coordinates));
    const numCoords = route.geometry.coordinates.length;
    setEndCoord(route.geometry.coordinates[numCoords - 1]);
  }, [route]);

  if (!route) {
    return null;
  }

  const layerStyles = {
    origin: {
      circleRadius: 5,
      circleColor: 'white',
    },
    destination: {
      circleRadius: 5,
      circleColor: 'white',
    },
    line: {
      lineColor: 'white',
      lineCap: 'round',
      lineWidth: 3,
      lineOpacity: 0.84,
    },
    progress: {
      lineColor: '#000',
      lineWidth: 4,
    },
  };

  return (
    <>
      {routeString ? (
        <MapboxGL.ShapeSource id="routeSource" shape={routeString}>
          <MapboxGL.LineLayer id="routeFill" style={layerStyles.line} />
        </MapboxGL.ShapeSource>
      ) : null}
      {progressLine ? (
        <MapboxGL.Animated.ShapeSource id="progressSource" shape={progressLine}>
          <MapboxGL.Animated.LineLayer
            id="progressFill"
            style={layerStyles.progress}
            aboveLayerID="routeFill"
          />
        </MapboxGL.Animated.ShapeSource>
      ) : null}
      {endCoord ? (
        <MapboxGL.ShapeSource id="destination" shape={point(endCoord)}>
          <MapboxGL.CircleLayer
            id="destinationInnerCircle"
            style={layerStyles.destination}
          />
        </MapboxGL.ShapeSource>
      ) : null}
    </>
  );
};
