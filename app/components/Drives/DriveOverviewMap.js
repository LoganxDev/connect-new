import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {StyleSheet} from 'react-native';

import Assets from '../../constants';

export default DriveOverviewMap = ({coords, currentTime, bbox}) => {
  // const { route } = this.props.navigation.state.params;
  const fetchCoords = () => {
    console.log('fetching coords');
  }

  const pinCoord =
    coords && coords.geometry.coordinates[Math.floor(currentTime)];
  return (
    <MapboxGL.MapView
      styleURL={MapboxGL.StyleURL.Dark}
      visibleCoordinateBounds={bbox}
      // ref={ ref => {
      //   this.mapRef = ref
      // } }
      onDidFinishLoadingMap={() => {
        if (!coords) {
          fetchCoords();
        }
      }}
      showUserLocation={false}
      style={styles.driveCoverMap}
      // attributionEnabled={false}
      compassEnabled={false}
      logoEnabled={false}>
      {coords && (
        <View>
          <MapboxGL.ShapeSource id="routeCoords" shape={coords}>
            <MapboxGL.LineLayer id="routeLine" style={layerStyles.route} />
          </MapboxGL.ShapeSource>
          {pinCoord && (
            <MapboxGL.PointAnnotation
              id="pointAnnotation"
              title=""
              style={styles.annotationPin}
              anchor={{x: 0.5, y: 1}}
              coordinate={pinCoord}>
              <X.Image
                source={Assets.iconPinParked}
                style={styles.annotationPin}
              />
            </MapboxGL.PointAnnotation>
          )}
        </View>
      )}
    </MapboxGL.MapView>
  );
};

const layerStyles = MapboxGL.StyleSheet.create({
  route: {
    lineColor: 'white',
    lineWidth: 3,
    lineOpacity: 0.84,
  },
});

const styles = StyleSheet.create({
  driveCoverMap: {
    flex: 1,
  },
  annotationPin: {
    height: 40,
    width: 260/6.0,
  }
})