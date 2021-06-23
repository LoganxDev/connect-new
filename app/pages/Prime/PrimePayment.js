import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Text
} from 'react-native';
import {LiteCreditCardInput} from 'react-native-credit-card-input';
import CardIcons from 'react-native-credit-card-input/src/Icons';
import stripe from 'tipsi-stripe';
import {useNavigation} from '@react-navigation/native';

import {DeviceContext} from '../../contexts/DeviceContext';
import X from '../../theme';
import {Assets} from '../../constants';
import gStyles from '../../constants/styles';
import BasePage from '../Util/BasePage';

const nativePayAsset =
  Platform.OS === 'android' ? Assets.googlePayMark : Assets.applePayMark;

export default PrimePayment = (props) => {
  const navigation = useNavigation();
  const {device} = useContext(DeviceContext);
  const [canUseNativePay, setCanUseNativePay] = useState(false);
  const [card, setCard] = useState(null);
  const [usingNativePay, setUsingNativePay] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [chooseDisabled, setChooseDisabled] = useState(false);
  const [chargeText, setChargeText] = useState(
    'Your card will be charged $24.00 today and monthly thereafter.',
  );

  const claimEndDate = () => {
    if (device?.subscription?.trial_claim_end) {
      return moment.unix(device.subscription.trial_claim_end).format('MMMM Do');
    } else {
      return null;
    }
  };

  const trialCheck = () => {
    if (device?.subscription?.trial_claimable) {
      let chargeText = `Add a card to claim your trial.
      Your card will be charged $24.00 on ${firstChargeDate()} and monthly thereafter.`;
      if (claimEndDate()) {
        chargeText += `\nOffer only valid until ${claimEndDate()}.`;
      }
      setChargeText(chargeText);
    }
  };

  useEffect(() => {
    const checkNativePaySupport = async () => {
      if (stripe) {
        // will remove upon google pay approval
        if (Platform.OS !== 'android') {
          const nativePayAllowed = await stripe.canMakeNativePayPayments();
          console.error(nativePayAllowed);
          setCanUseNativePay(nativePayAllowed);
        }
      }
    };

    trialCheck();
    checkNativePaySupport();
    console.log(card);
  }, []);

  const _handleChoosePaymentMethod = (useNativePay) => {
    if (chooseDisabled) {
      return;
    }
    setUsingNativePay(useNativePay);
    setCard(!useNativePay ? card : null);
  };

  const _placeholderCard = () => {
    if (paymentMethod) {
      return {
        number: '0000 '.repeat(3) + paymentMethod.last4,
        expiry:
          paymentMethod.exp_month +
          '/' +
          paymentMethod.exp_year.toString().substring(2, 4),
        cvc: 'CVC',
      };
    } else {
      return null;
    }
  };

  const onSubmit = (card, usingNativePay) => {
    const simInfo = props?.route?.params?.simInfo;
    navigation.navigate('PrimeActivationSpinner', {device, simInfo, card, usingNativePay});
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <BasePage backPage="PrimeDevicePick">
          <Text style={styles.title}>Activate comma prime</Text>
          <X.Text style={styles.chargeText}>{chargeText}</X.Text>
          <View style={styles.primePaymentInfoMethods}>
            <X.Text color="black">Choose your payment method</X.Text>
            <View style={styles.primePaymentInfoOptions}>
              <X.Button
                color="borderless"
                style={styles.primePaymentInfoOption}
                onPress={() => _handleChoosePaymentMethod(false)}>
                <View style={styles.primePaymentInfoOptionLogo}>
                  <X.Image
                    source={
                      (card && CardIcons[card.values.type]) ||
                      CardIcons.placeholder
                    }
                  />
                </View>
                <View
                  style={[
                    styles.primePaymentInfoOptionSelection,
                    !usingNativePay && styles.primePaymentInfoOptionSelected,
                  ]}>
                  {!usingNativePay && (
                    <X.Image
                      source={Assets.iconCheckmark}
                      style={styles.primePaymentInfoOptionCheckmark}
                    />
                  )}
                </View>
              </X.Button>
              {canUseNativePay && (
                <X.Button
                  color="borderless"
                  style={styles.primePaymentInfoOption}
                  onPress={() => _handleChoosePaymentMethod(true)}>
                  <View style={styles.primePaymentInfoOptionLogo}>
                    <X.Image source={Assets.applePayMark} />
                  </View>
                  <View
                    style={[
                      styles.primePaymentInfoOptionSelection,
                      usingNativePay && styles.primePaymentInfoOptionSelected,
                    ]}>
                    {usingNativePay && (
                      <X.Image
                        source={Assets.iconCheckmark}
                        style={styles.primePaymentInfoOptionCheckmark}
                      />
                    )}
                  </View>
                </X.Button>
              )}
            </View>
          </View>
          <View style={styles.primePaymentInfoDetails}>
            {usingNativePay ? (
              <View style={styles.primePaymentInfoDetailsApplePay}>
                <X.Text color="lightGrey">
                  You have selected Apple Pay® for recurring comma prime
                  payments
                </X.Text>
              </View>
            ) : (
              <View style={styles.primePaymentInfoDetailsCard}>
                <LiteCreditCardInput
                  inputStyle={styles.cardInput}
                  onChange={(card) => setCard(card)}
                />
              </View>
            )}
            <WideButton
              style={styles.primePaymentInfoDetailsSubmit}
              textStyle={{color: gStyles.text.primary}}
              onPress={() => onSubmit(card, usingNativePay)}
              text="Activate"
              disabled={
                props.submitDisabled !== undefined
                  ? props.submitDisabled
                  : !(card?.valid || usingNativePay)
              }>
            </WideButton>
          </View>
        </BasePage>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: gStyles.text.medium,
    color: gStyles.text.primary,
    fontWeight: 'bold',
    marginBottom: 10
  },
  chargeText: {
    color: gStyles.text.primary,
    fontSize: gStyles.text.small,
    textAlign: 'center',
    marginBottom: 20,
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },
  primePaymentInfo: {
    width: '100%',
    minHeight: 100,
  },
  primePaymentInfoMethods: {
    minHeight: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E4E4E4',
    paddingTop: 10,
    paddingBottom: 10,
  },
  primePaymentInfoDetails: {
    backgroundColor: '#fff',
    height: '100%',
    padding: 20,
    width: '100%',
  },
  primePaymentInfoOptions: {
    flexDirection: 'row',
  },
  primePaymentInfoOption: {
    alignItems: 'center',
    height: 100,
  },
  primePaymentInfoOptionLogo: {
    margin: 10,
    width: 112,
    height: 51,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 11,
    borderColor: 'rgba(0,0,0,0.15)',
    borderWidth: 1,
  },
  primePaymentInfoOptionSelection: {
    width: 25,
    height: 25,
    padding: 5,
    borderRadius: 12.5,
    borderColor: 'rgba(0,0,0,0.23)',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  primePaymentInfoOptionSelected: {
    backgroundColor: '#178644',
  },
  primePaymentInfoDetailsSubmit: {
    marginTop: 15,
    backgroundColor: '#000'
  },
  cardInput: {
    color: 'black',
  },
  primePaymentInfoDetailsCard: {
    marginRight: -25,
  },
});
