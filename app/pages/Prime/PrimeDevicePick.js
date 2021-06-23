import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import BasePage from '..//Util/BasePage';
import DeviceList from '../../components/DeviceList/DeviceList';
import WideButton from '../../components/Util/WideButton';

export default PrimeDevicePick = () => {
  const navigation = useNavigation();
  const [selectedDevice, setSelectedDevice] = useState(null);

  const handleContinue = () => {
    console.log('continue');
    if (selectedDevice !== null) {
      navigation.navigate('PrimeSimSpinner', {device: selectedDevice});
    } else {
      console.log('No device selected');
    }
  };

  const deviceSelected = (device) => {
    setSelectedDevice(device);
  };

  return (
    <BasePage title="Select a device">
      <DeviceList onSelection={deviceSelected}></DeviceList>

      <View style={styles.buttonWrap}>
        <WideButton
          onPress={handleContinue}
          disabled={selectedDevice == null}
          text="Continue"
        />
      </View>
    </BasePage>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#111',
    width: '100%',
    alignItems: 'center',
  },
  buttonWrap: {
    width: '100%',
    position: 'absolute',
    bottom: 50,
  },
});
