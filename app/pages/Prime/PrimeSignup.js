import React, {useEffect, useContext, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import gStyles from '../../constants/styles';
import {DeviceContext} from '../../contexts/DeviceContext';
import {getSubscription} from '../../api/billing';
import BasePage from '..//Util/BasePage';
import WideButton from '../../components/Util/WideButton';

const features = [
  'Real-time car location',
  'Take pictures remotely',
  '1 year storage of drive videos',
  'Simple SSH for developers',
  '24/7 connectivity',
  'Unlimited data at 512kbps*',
];

export default PrimeSignup = () => {
  const navigation = useNavigation();
  const {device} = useContext(DeviceContext);
  const [chargeText, setChargeText] = useState('For the low cost of $24/Month');

  useEffect(() => {
    const getSub = async (dongle_id) => {
      const sub = await getSubscription(dongle_id);
      console.log('sub');
      if (sub?.trial_claimable) {
        setChargeText('Activate your comma prime trial');
      }
    };

    getSub(device?.device?.dongle_id);
  }, [device]);

  return (
    <BasePage>
      <View style={styles.primeHeader}>
        <Text style={styles.commaTitle}>comma</Text>
        <Text style={styles.primeTitle}>prime</Text>
      </View>

      <View style={styles.primeSubheader}>
        <Text style={styles.primeDesc}>
          comma prime grants exclusive benefits such as remotely accessing your
          device, and drive storage for a year.
        </Text>
      </View>

      <Text style={styles.primePrice}>{chargeText}</Text>

      <View style={styles.benfitsHeader}>
        <Text style={styles.benefitsTitleBold}>prime</Text>
        <Text style={styles.benefitsTitleLight}>benefits</Text>
      </View>
      <View style={styles.benefits}>
        {features.map((feature, index) => (
          <Text key={index} style={styles.benefit}>
            {feature}
          </Text>
        ))}
      </View>
      <View style={styles.buttonWrap}>
        <WideButton
          onPress={() => navigation.navigate('PrimeDevicePick')}
          text="Activate comma prime"
        />
      </View>
      <Text style={styles.asterisk}>
        * Data plan only offered in the United States
      </Text>
    </BasePage>
  );
};

const styles = StyleSheet.create({
  primeHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  primeTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: gStyles.text.large,
    textAlign: 'center',
    marginLeft: 10,
  },
  commaTitle: {
    color: '#fff',
    fontWeight: '100',
    fontSize: gStyles.text.large,
    textAlign: 'center',
  },
  primeSubheader: {
    marginBottom: 20,
    width: '100%',
  },
  primeDesc: {
    fontSize: gStyles.text.small,
    color: '#aaa',
    paddingLeft: 30,
  },
  primePrice: {
    fontSize: gStyles.text.small,
    color: '#fff',
    paddingLeft: 30,
    width: '100%',
    marginBottom: 60,
  },
  benfitsHeader: {
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  benefitsTitleBold: {
    color: '#fff',
    fontWeight: '700',
    fontSize: gStyles.text.medium,
    textAlign: 'center',
  },
  benefitsTitleLight: {
    color: '#fff',
    fontWeight: '100',
    fontSize: gStyles.text.medium,
    textAlign: 'center',
    marginLeft: 10,
  },
  benefits: {
    width: '100%',
    marginBottom: 10,
  },
  benefit: {
    width: '100%',
    color: '#fff',
    fontWeight: '500',
    fontSize: gStyles.text.small,
    textAlign: 'left',
    marginBottom: 15,
    paddingLeft: 20,
  },
  buttonWrap: {
    width: '100%',
    marginTop: 50,
    marginBottom: 10,
  },
  activateButton: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 50,
    paddingTop: 10,
    paddingBottom: 10,
  },
  activateText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
  },
  asterisk: {
    width: '100%',
    color: '#fff',
    fontWeight: '400',
    fontSize: gStyles.text.tiny,
    textAlign: 'center',
  },
});
