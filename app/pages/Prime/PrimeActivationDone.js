import React, {useEffect, useContext, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import gStyles from '../../constants/styles';

import BasePage from '..//Util/BasePage';
import WideButton from '../../components/Util/WideButton';
import {DeviceContext} from '../../contexts/DeviceContext';

export default PrimeActivationDone = ({route}) => {
  const navigation = useNavigation();
  const {device} = useContext(DeviceContext);
  const [successText, setSuccessText] = useState(
    'Connectivity will be enabled as soon as activation propagates to your local cell tower.\n\nRebooting your device may help.',
  );

  useEffect(() => {
    if (route?.params?.payResp) {
      if (payResp.already_active) {
        setSuccessText(
          'comma prime is already active for this device.\nYou have not been charged for another subscription.',
        );
      }
    }
  }, [route?.params]);

  return (
    <BasePage>
      <View style={styles.title}>
        <Text style={styles.commaTitle}>comma</Text>
        <Text style={styles.primeTitle}>prime</Text>
      </View>

      <Text style={styles.h1}>Activated</Text>
      <Text style={styles.h2}>Thank You!</Text>
      <Text style={styles.success}>{successText}</Text>
      <WideButton
        onPress={() => navigation.navigate('Home')}
        text="Done"
        style={styles.footerButton}
      />
    </BasePage>
  );
};

const styles = StyleSheet.create({
  title: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  primeTitle: {
    color: gStyles.text.primary,
    fontWeight: '700',
    fontSize: gStyles.text.huge,
    textAlign: 'center',
    marginLeft: 10,
  },
  commaTitle: {
    color: gStyles.text.primary,
    fontWeight: '100',
    fontSize: gStyles.text.huge,
    textAlign: 'center',
  },
  success: {
    fontSize: gStyles.text.small,
    color: '#aaa',
    width: '85%',
  },
  h2: {
    color: gStyles.text.primary,
    fontWeight: '300',
    fontSize: gStyles.text.large,
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 60,
  },
  h1: {
    color: gStyles.text.primary,
    fontWeight: '700',
    fontSize: gStyles.text.medium,
    textAlign: 'center',
    marginBottom: 20,
  },
  footerButton: {
    position: 'absolute',
    bottom: 50,
  },
});
