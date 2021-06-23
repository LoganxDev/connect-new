import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {fetchDeviceSimInfo} from '../../actions/Devices';

import BasePage from '../Util/BasePage';
import PortableSpinner from '../../components/Util/PortableSpinner';
import WideButton from '../../components/Util/WideButton';

export default PrimeSimSpinner = ({route}) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [device, setDevice] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (route.params?.device) {
      setDevice(route.params?.device);
    }
  }, [route.params?.device]);

  useEffect(() => {
    retry(device);
  }, [device]);

  const retry = async (device) => {
    console.log(device);
    const resp = await fetchDeviceSimInfo(device?.dongle_id);
    if (resp?.error) {
      setErrorMsg(resp.message);
    } else {
      const simInfo = resp?.simInfo;
      navigation.navigate('PrimePayment', {dongleId: device?.dongle_id, simInfo});
    }
  };

  const cancelActivation = () => {
    navigation.navigate('Home');
  };

  return (
    <BasePage noHeader>
      <View style={styles.container}>
        <PortableSpinner
          message={errorMsg || route.params.message}
          isStatic={errorMsg !== null}
        />
        <View>
          {errorMsg !== null && (
            <WideButton
              onPress={() => retry(device)}
              text="Try Again"
            />
          )}
          <Button
            color="#fff"
            onPress={cancelActivation}
            title="Activate Later"
          />
        </View>
      </View>
    </BasePage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 100,
    width: '100%',
  },
});
