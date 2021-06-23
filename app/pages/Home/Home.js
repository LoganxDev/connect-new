import React, {useEffect, useState, useContext, useRef} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Geolocation from '@react-native-community/geolocation';
import {useNavigation} from '@react-navigation/native';
import {lineString as makeLineString} from '@turf/helpers';
import Orientation from 'react-native-orientation-locker';

import {fetchDevices, getMostRecentDevice} from '../../actions/Devices';
import {getSubscription} from '../../api/billing';
import ApiKeys from '../../constants/apiKeys';
import X from '../../theme';
import {Assets} from '../../constants';

import BottomSheet from '../../components/Util/BottomSheet';
import SidebarToggleButton from '../../components/Sidebar/SidebarToggleButton';
import {DeviceContext} from '../../contexts/DeviceContext';
import {DevicesContext} from '../../contexts/DevicesContext';
import VehiclePins from '../../components/VehiclePins/VehiclePins';
import Route from '../../components/Util/Route';

const {width, height} = Dimensions.get('screen');
const turf = require('@turf/turf');
MapboxGL.setAccessToken(ApiKeys.MAPBOX_TOKEN);

export default Home = ({route}) => {
  const navigation = useNavigation();
  const [drivingRoute, setDrivingRoute] = useState(null);
  // tastefully chosen default map region
  const [bbox, setBbox] = useState([
    [-117.918976, 33.812511],
    [-117.918976, 33.812511],
  ]);
  const [bounds, setBounds] = useState({
    ne: bbox[0],
    sw: bbox[1],
  });
  const {device, dispatch} = useContext(DeviceContext);
  const {devicesDispatch} = useContext(DevicesContext);
  // const [location, setLocation] = useState([-117.918976, 33.812511])
  const mapRef = useRef(null);
  const camRef = useRef(null);

  useEffect(() => {
    const initDevices = async () => {
      const allDevices = await fetchDevices();
      if (allDevices !== undefined) {
        // Instead of most recently active device there should be a primary field
        getMostRecentDevice(allDevices, dispatch);
        devicesDispatch({type: 'ACTION_DEVICES_FETCHED', payload: allDevices});
        // deviceDispatch({type: 'ACTION_DEVICES_FETCHED', payload: allDevices});
        // let subscriptionInfo = await getSubscription(device.dongle_id);
        // console.log('subinfo: ', subscriptionInfo);
      }
    };

    initDevices();
    Orientation.lockToPortrait();
  }, []);

  useEffect(() => {
    if (device?.device) {
      // console.log('device updated');
      // console.log(device);
      setBbox([
        [device.device.location.lng, device.device.location.lat],
        [device.device.location.lng, device.device.location.lat],
      ]);
    }
  }, [device]);

  useEffect(() => {
    setBounds({ne: bbox[0], sw: bbox[1]});
  }, [bbox]);

  useEffect(() => {
    if (route.params?.selectedRoute) {
      setDrivingRoute(route.params.selectedRoute);
      const coords = route.params.selectedRoute.geometry.coordinates;
      const lineString = makeLineString(coords);
      const routeBbox = turf.bbox(lineString);

      if (camRef) {
        camRef.current.fitBounds(
          [routeBbox[0], routeBbox[1]],
          [routeBbox[2], routeBbox[3]],
          [120, 50],
          600,
        );
      }
    }
  }, [route.params?.selectedRoute]);

  const flyToCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (pos) => {
        if (camRef) {
          camRef.current.flyTo([pos.coords.longitude, pos.coords.latitude]);
        }
      },
      (error) => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  MapboxGL.setTelemetryEnabled(false);

  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        style={styles.map}
        styleURL={MapboxGL.StyleURL.Dark}
        logoEnabled={false}
        compassEnabled={false}
        ref={mapRef}>
        <MapboxGL.Camera bounds={bounds} maxZoomLevel={18} ref={camRef} />
        <Route route={drivingRoute} />
        <VehiclePins />
        <MapboxGL.UserLocation />
      </MapboxGL.MapView>
      <View style={styles.mapHeader}>
        <SidebarToggleButton navigation={navigation} />
        <X.Button
          size="full"
          color="borderless"
          onPress={flyToCurrentLocation}
          style={{height: height / 22, width: height / 22}}>
          <X.Image
            source={Assets.iconMyLocation}
            style={{height: height / 22, width: height / 22}}
          />
        </X.Button>
      </View>
      <BottomSheet></BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#111',
  },
  map: {
    flex: 1,
    alignSelf: 'stretch',
  },
  mapHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 50,
    paddingTop: height / 13,
    paddingLeft: width / 20,
    paddingRight: width / 20,
  },
});
