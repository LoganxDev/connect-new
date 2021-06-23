import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import gStyles from '../../constants/styles';
import {DeviceContext} from '../../contexts/DeviceContext';

import BasePage from '../Util/BasePage';
import DeviceList from '../../components/DeviceList/DeviceList';
import DeviceItem from '../../components/DeviceList/DeviceItem';
import AddDeviceButton from '../../components/Device/AddDeviceButton';

export default DeviceSettings = () => {
  const {device} = useContext(DeviceContext);
  const navigation = useNavigation();

  const deviceSelected = (device) => {
    if (device) {
      navigation.navigate('DeviceSettings');
    }
  };

  return (
    <BasePage title="Devices">
      <Text style={styles.header}>Default Device</Text>
      <DeviceItem
        device={device.device}
        index={0}
        showArrow
        onPress={() => navigation.navigate('DefaultDevicePick')}></DeviceItem>
      <View style={styles.spacer}></View>
      <Text style={styles.header}>All Devices</Text>
      <DeviceList
        showInfoIcons
        forgetOnClick
        onSelection={deviceSelected}></DeviceList>
      <AddDeviceButton />
    </BasePage>
  );
};

const styles = StyleSheet.create({
  header: {
    color: '#fff',
    fontSize: gStyles.text.small,
    textAlign: 'left',
    marginBottom: 15,
    width: '100%',
    paddingLeft: 15,
    fontWeight: '600',
  },
  spacer: {
    height: 60,
  },
});
