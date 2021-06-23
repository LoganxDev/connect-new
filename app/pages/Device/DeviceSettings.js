import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, View, Button} from 'react-native';

import {deviceTitle} from '../../utils/device';
import {setDeviceAlias} from '../../actions/Devices';
import {DeviceContext} from '../../contexts/DeviceContext';

import BasePage from '..//Util/BasePage';
import SettingsItem from '../../components/Util/SettingsItem';

export default DeviceSettings = ({route}) => {
  const {device} = useContext(DeviceContext);
  const [deviceName, setDeviceName] = useState("");

  const unpair = () => {
    console.log('unpair');
  };

  useEffect(() => {
    setDeviceName(deviceTitle(device.device))
  }, [device]);

  useEffect(() => {
    if (route.params?.value && route.params?.key) {
      switch (route.params?.key) {
        case 'Name':
          setDeviceName(route.params?.value);
          const updatedDevice = setDeviceAlias(device?.device?.dongle_id, route.params?.value);
          break;
        default:
      }
    }
  }, [route.params?.value]);

  return (
    <BasePage title="Device Settings">
      <View style={styles.list}>
        <SettingsItem field="Name" value={deviceName} mutable />
        <SettingsItem field="Dongle ID" value={device?.device?.dongle_id} />
        <SettingsItem field="Device Type" value={device?.device?.device_type} />
        <View style={{height: 100, justifyContent: 'center'}}>
          <Button onPress={unpair} title="Unpair Device" color="red"></Button>
        </View>
      </View>
    </BasePage>
  );
};

const styles = StyleSheet.create({
  list: {
    borderTopColor: '#555',
    borderTopWidth: 1,
    width: '100%',
  },
});
