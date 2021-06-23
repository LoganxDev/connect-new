import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';

import BasePage from '..//Util/BasePage';
import PrimaryDeviceList from '../../components/DeviceList/PrimaryDeviceList';

import gStyles from '../../constants/styles';

export default DefaultDevicePick = ({route}) => {
  const [deviceName, setDeviceName] = useState('');

  const deviceSelected = (device) => {
    // may need to get the device here
    // dispatch({type: 'PRIMARY_DEVICE_UPDATED', payload: device});
    // getStats(device);
    // console.log(device);
  };

  return (
    <BasePage title="Default Device">
      <Text style={styles.header}>Select a device</Text>
      <PrimaryDeviceList onSelection={deviceSelected}></PrimaryDeviceList>
    </BasePage>
  );
};

const styles = StyleSheet.create({
  header: {
    color: '#fff',
    fontSize: gStyles.text.small,
    fontWeight: '500',
    width: '100%',
    textAlign: 'left',
    paddingLeft: 15,
    marginBottom: 15,
  },
});
