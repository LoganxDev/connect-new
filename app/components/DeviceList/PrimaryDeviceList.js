import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, ScrollView} from 'react-native';

import {DevicesContext} from '../../contexts/DevicesContext';

import PrimaryDeviceListItem from '../../components/DeviceList/PrimaryDeviceListItem';
import device from '../../reducers/device';

export default PrimaryDeviceList = ({onSelection}) => {
  const {devices} = useContext(DevicesContext);
  const [primaryDevice, setPrimaryDevice] = useState({dongle_id: ''});
  const [deviceList, setDeviceList] = useState([]);

  useEffect(() => {
    // Get primary devive dongle id
    setDeviceList(devices.devicesDriveTimeSorted);
  }, [devices]);

  useEffect(() => {
    if (deviceList.length < 1) {
      // No devices do not set a primary
      return;
    }

    // Get primary devive dongle id
    // setDeviceList(devices.devicesDriveTimeSorted);
    if (deviceList.length == 1) {
      setPrimaryDevice({dongle_id: deviceList[0].dongle_id});
    } else {
      // Testing
      setPrimaryDevice({dongle_id: deviceList[0].dongle_id});
    }
  }, [deviceList]);

  useEffect(() => {
    // console.log(primaryDevice)
    onSelection(primaryDevice);
  }, [primaryDevice]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      {deviceList !== undefined &&
        deviceList.length > 0 &&
        deviceList.map((device, index) => (
          <PrimaryDeviceListItem
            key={index}
            index={index}
            isPrimary={
              primaryDevice && device.dongle_id === primaryDevice.dongle_id
            }
            device={device}
            onChange={(devicePicked) => setPrimaryDevice(devicePicked)}
          />
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  contentContainer: {
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#555',
  },
});
