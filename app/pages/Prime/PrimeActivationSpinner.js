import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import stripe, { tokenizeNativePay, tokenizeCard } from '../../api/stripe';
import BasePage from '../Util/BasePage';
import PortableSpinner from '../../components/Util/PortableSpinner';
import WideButton from '../../components/Util/WideButton';

export default PrimeActivationSpinner = ({route}) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [device, setDevice] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (route.params?.device) {
      setDevice(route.params?.device);
    }
  }, [route.params?.device]);

  useEffect(() => {
    retry(device, route?.params?.simInfo, route?.params?.card, route?.params?.useNativePay);
  }, [device]);

  const activate = async (dongleId, simInfo, card, useNativePay) => {
    return {payResp: {success: 1}};
    try {
      let stripeToken;
      if (useNativePay) {
        console.log('using native pay');
        if (device?.subscription?.trial_claimable) {
          const firstCharge = firstChargeDate();
          console.log({firstCharge});
          stripeToken = await tokenizeNativePay({ label: `comma prime trial ${firstCharge}` });
        } else {
          stripeToken = await tokenizeNativePay();
        }
      } else {
        stripeToken = await tokenizeCard(card);
      }
      try {
        // const payResp = await Billing.payForPrime(dongleId, simInfo.sim_id, stripeToken.tokenId);
        if ('error' in payResp) {
          if (payResp['error'] === "Subscription already active") {
            stripe.cancelNativePayRequest();
            // primeActivated(dongleId);
            return {payResp: {success: 1, already_active: true}};
          } else if (payResp['error'] === 'Payment failed') {
            throw new Error('Card declined');
          } else if (payResp['error'] === 'Invalid SIM') {
            throw new Error('Invalid SIM. Make sure you have an unactivated comma SIM inserted');
          } else {
            console.log('unknown error', payResp);
            throw new Error(payResp.error);
          }
        } else if (payResp['success']) {
          stripe.completeNativePayRequest();
          // primeActivated(dongleId);
          return { payResp };
        } else {
          // wtf
          console.log('unknown error', payResp);
          throw new Error('An error occurred');
        }
      } catch(err) {
        console.error('server error', err);
        throw new Error('An error occurred');
      }
    } catch(err) {
      stripe.cancelNativePayRequest();
      console.log(err.message);
      navigation.navigate('PrimeActivationPayment', { dongleId, simInfo, error: err.message });
      throw err;
    }
  }

  const firstChargeDate = () => {
    if (device?.subscription?.trial_end) {
      return moment.unix(device.subscription.trial_end).format("MMMM Do")
    } else {
      return null;
    }
  }

  const claimEndDate = () => {
    if (device?.subscription?.trial_claim_end) {
      return moment.unix(this.subscription().trial_claim_end).format("MMMM Do")
    } else {
      return null;
    }
  }

  const retry = async (device, simInfo, card, useNativePay) => {
    console.log(card);
    const resp = await activate(device.dongle_id, simInfo, card, useNativePay);
    if ('error' in resp) {
      setErrorMsg(resp.message);
    } else {
      navigation.navigate('PrimeActivationDone', {dongleId: device.dongle_id});
    }
  };

  const cancelActivation = () => {
    navigation.navigate('Home');
  };

  return (
    <BasePage noHeader>
      <View style={styles.container}>
        <PortableSpinner
          message={errorMsg || "Activating..."}
          isStatic={errorMsg !== null}
        />
        <View>
          {errorMsg !== null && (
            <WideButton
              onPress={() => retry(device)}
              text="Try Again"
            />
          )}
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
