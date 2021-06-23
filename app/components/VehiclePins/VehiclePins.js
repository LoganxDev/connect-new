import React, {useContext} from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';

import Assets from '../../constants/assets';
import {DeviceContext} from '../../contexts/DeviceContext';
import {DevicesContext} from '../../contexts/DevicesContext';
import {deviceTitle} from '../../utils/device';

const mapStyles = {
  vehiclePin: {
    iconAnchor: 'bottom',
    iconImage: Assets.iconPinParked,
    // iconSize: __DEV__ ? 0.75 : 0.25,
    iconSize: 0.25,
  },
};

export default VehiclePins = () => {
  const {device} = useContext(DeviceContext);
  const {devices} = useContext(DevicesContext);
  // const {devices, devicesDriveTimeSorted, deviceLocations} = this.props.devices;
  // const {selectedPin} = this.state;
  // const now = Date.now();
  // const locEntries = devicesDriveTimeSorted
  //   .map((dongleId) => [dongleId, deviceLocations[dongleId]])
  //   .filter(
  //     ([dongleId, location]) =>
  //       location !== undefined &&
  //       dongleId !== selectedPin &&
  //       now - location.time < ONE_WEEK_MILLIS,
  //   );
  // if (selectedPin && deviceLocations[selectedPin]) {
  //   locEntries.push([selectedPin, deviceLocations[selectedPin]]);
  // }
  // console.log('vehiclePins')
  // console.log(device.device);
  // console.log(devices.devicesDriveTimeSorted);

  if (!devices || !devices.devicesDriveTimeSorted) {
    locEntries = [];
  } else {
    locEntries = devices.devicesDriveTimeSorted.map((device) => [
      device.dongle_id,
      {lat: device.location.lat, lng: device.location.lng},
    ]);
  }

  //   if (Platform.OS === 'ios') {
  //     locEntries = devices.devicesDriveTimeSorted
  //       .map(dongleId => [dongleId, deviceLocations[dongleId]])
  //       .filter(([dongleId, location]) => location !== undefined && dongleId === selectedPin && now - location.time < ONE_WEEK_MILLIS);
  //   } else {
  //     locEntries = devices.devicesDriveTimeSorted
  //       .map(dongleId => [dongleId, deviceLocations[dongleId]])
  //       .filter(([dongleId, location]) => location !== undefined && dongleId !== selectedPin && now - location.time < ONE_WEEK_MILLIS);
  //     if (selectedPin && deviceLocations[selectedPin]) {
  //       locEntries.push([selectedPin, deviceLocations[selectedPin]]);
  //     }
  //   }

  if (devices !== undefined && devices.devicesDriveTimeSorted !== undefined) {
    return locEntries.map(([dongleId, location]) => {
      if (location.lng && device?.device) {
        const title = deviceTitle(device.device);
        const shape = {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {
                // title: selectedPin === dongleId ? title : '',
                title: title,
                dongleId,
                isVehiclePin: true,
              },
              geometry: {
                type: 'Point',
                coordinates: [location.lng, location.lat],
              },
            },
          ],
        };
        return (
          <MapboxGL.ShapeSource
            id={'vehiclePin_' + dongleId}
            key={'vehiclePin_' + dongleId}
            shape={shape}>
            <MapboxGL.SymbolLayer
              id={'vehiclePin_' + dongleId}
              style={mapStyles.vehiclePin}
            />
          </MapboxGL.ShapeSource>
        );
      } else {
        return <></>;
      }
    });
  } else {
    return <></>;
  }
};
