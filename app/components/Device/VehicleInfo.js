import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, View, Text, Image, Dimensions} from 'react-native';
import moment from 'moment';

import {fetchDeviceCarHealth} from '../../actions/Devices';
import {reverseLookup} from '../../api/geocoding';

import {DeviceContext} from '../../contexts/DeviceContext';
import {DevicesContext} from '../../contexts/DevicesContext';
import {Assets} from '../../constants';
import gStyles from '../../constants/styles';

const {width, height} = Dimensions.get('screen');

export default VehicleInfo = () => {
  const [voltage, setVoltage] = useState(0);
  const [location, setLocation] = useState('Unknown');
  const [lastPing, setLastPing] = useState(null);
  const {device} = useContext(DeviceContext);

  const getVehicleInfo = async (device) => {
    const vehicleInfoAsync = await fetchDeviceCarHealth(device.dongle_id);
    if (vehicleInfoAsync) {
      setVoltage((vehicleInfoAsync.health.voltage / 1000).toFixed(1));
    }
  };

  const getVehicleLocation = async (device) => {
    const locationAsync = await reverseLookup([
      device.location.lng,
      device.location.lat,
    ]);
    const locationString =
      locationAsync.streetAddress +
      ', ' +
      locationAsync.locality +
      ' ' +
      locationAsync.region +
      ', ' +
      locationAsync.zipCode;
    setLocation(locationString);
    const dtFormat = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    });

    const newTime = dtFormat.format(new Date(device?.last_athena_ping * 1e3));
    if (newTime) {
      setLastPing(
        `${newTime} (${moment(Date(device?.last_athena_ping)).fromNow()})`,
      );
    }
  };

  useEffect(() => {
    if (device) {
      getVehicleInfo(device.device);
      getVehicleLocation(device.device);
    }
  }, [device]);

  return (
    <View style={styles.container}>
      <View style={styles.devicesSubHdr}>
        <View style={styles.row}>
          <Image source={Assets.iconStatusParked} style={styles.icon} />
          <View>
            <Text style={styles.infoValue}>{location}</Text>
            {lastPing && <Text style={styles.infoValue}>{lastPing}</Text>}
          </View>
        </View>
      </View>
      <View style={styles.devicesSubHdr}>
        <View style={styles.row}>
          <Image source={Assets.iconBattery} style={styles.icon} />
          <Text style={styles.infoValue}>{voltage} Volts</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    minHeight: 180,
  },
  devicesSubHdr: {
    paddingLeft: 15,
    marginBottom: 20,
    width: width - 65
  },
  infoValue: {
    color: '#aaa',
    fontSize: gStyles.text.small,
    fontWeight: '400',
  },
  icon: {
    height: 35,
    width: 35,
    marginRight: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
