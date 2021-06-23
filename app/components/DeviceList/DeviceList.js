import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet} from 'react-native';

import {DevicesContext} from '../../contexts/DevicesContext';

import DeviceItem from '../../components/DeviceList/DeviceItem';

export default DeviceList = ({onSelection, forgetOnClick, showInfoIcons}) => {
  const {devices} = useContext(DevicesContext);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [deviceList, setDeviceList] = useState(null);

  useEffect(() => {
    setDeviceList(devices.devicesDriveTimeSorted);
  }, [devices]);

  useEffect(() => {
    onSelection(selectedDevice);
    if (forgetOnClick) {
      setSelectedDevice(null);
    }
  }, [selectedDevice]);

  return (
    <>
      {deviceList !== null &&
        deviceList.length > 0 &&
        deviceList.map((device, index) => (
          <DeviceItem
            showInfo={showInfoIcons}
            key={index}
            index={index}
            customStyles={
              selectedDevice &&
              device.dongle_id === selectedDevice.dongle_id &&
              styles.selected
            }
            device={device}
            onPress={(devicePicked) => setSelectedDevice(devicePicked)}
          />
        ))}
    </>
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
    backgroundColor: '#222',
  },
});
