/**
 * comma SetupEonPairing Screen
 */

import React, {useState, useEffect} from 'react';
import {View, Linking, StyleSheet, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Permissions from 'react-native-permissions';
import QRCodeScanner from 'react-native-qrcode-scanner';
import X from '../../theme';
import BasePage from '../Util/BasePage';
// import WideButton from '../../components/Util/WideButton';
// import {Alert, Spinner} from '../../components';
import {
  pilotPair,
  fetchDevices,
  fetchDevice,
  fetchDeviceSubscription,
} from '../../actions/Devices';

import gStyles from '../../constants/styles';

export default SetupEonPairing = () => {
  const [wantsCameraPermissions, setWantsCameraPermissions] = useState(false);
  const [hasCameraPermissions, setHasCameraPermissions] = useState(false);
  const [attemptingPair, setAttemptingPair] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    Permissions.check('camera').then((response) => {
      if (response == 'authorized') {
        setHasCameraPermissions(true);
      }
    });
  }, []);

  const pairDevice = (imei, serial, pairToken) => {
    return pilotPair(imei, serial, pairToken)
      .then((dongleId) => {
        // dispatch(fetchDevices());
        return Promise.all([
          fetchDevice(dongleId),
          fetchDeviceSubscription(dongleId),
        ]);
      })
      .then(([device, deviceSubscription]) => {
        if (deviceSubscription && deviceSubscription.trial_claimable) {
          navigation.navigate('PrimeSignup', {dongleId: device.dongle_id});
        } else {
          navigation.navigate('AppDrawer');
        }
      });
  };

  const handleConfirmPressed = () => {
    setWantsCameraPermissions(true);
  };

  const handleDismissPressed = () => {
    navigation.navigate('Home');
  };

  const handleViewSetupGuidePressed = () => {
    Linking.openURL('https://comma.ai/setup');
  };

  const handleScannedQRCode = (e) => {
    setAttemptingPair(true);

    let imei, serial, pairToken;
    let qrDataSplit = e.data.split('--');
    if (qrDataSplit.length === 2) {
      imei = qrDataSplit[0];
      serial = qrDataSplit[1];
    } else if (qrDataSplit.length >= 3) {
      imei = qrDataSplit[0];
      serial = qrDataSplit[1];
      pairToken = qrDataSplit.slice(2).join('--');
    }
    if (imei === undefined || serial === undefined) {
      setAttemptingPair(false);
    }
    pairDevice(imei, serial, pairToken).catch((err) => {
      setAttemptingPair(false);
      console.log(err);
    });
  };

  if (attemptingPair) {
    return (
      <View style={styles.setupEonPairingContainer}>
        <Text style={{color: '#fff', fontSize: 20}}>Spinner</Text>
        {/* <Spinner spinnerMessage="Pairing Device..." /> */}
      </View>
    );
    // } else if (wantsCameraPermissions || hasCameraPermissions) {
  } else {
    return (
      <BasePage title="Pair Your Device">
        <View style={styles.setupEonPairingContainer}>
          <X.Entrance style={styles.setupEonPairingCamera}>
            <QRCodeScanner
              onRead={handleScannedQRCode}
              topContent={null}
              bottomContent={null}
              cameraProps={{captureAudio: false}}
            />
          </X.Entrance>
          <View style={styles.setupEonPairingInstruction}>
            <X.Text style={styles.setupEonPairingInstructionText}>
              Place the QR code from your device during setup within the frame.
            </X.Text>
            <Button
              onPress={handleViewSetupGuidePressed}
              title="View Setup Guide"
              color="#fff"></Button>
          </View>
        </View>
      </BasePage>
    );
    // } else {
    //   return (
    //     <BasePage>
    //       <View style={styles.setupEonPairingContainer}>
    //         <X.Entrance style={{height: '100%'}}>
    //         <Text style={{color:'#fff', fontSize: 20}}>Alert</Text>
    {
      /* <Alert
              title="Camera Access"
              message="We need camera access so you can finish setting up your device"
              dismissButtonAction={handleDismissPressed}
              confirmButtonAction={handleConfirmPressed}
              dismissButtonTitle="Not now"
              confirmButtonTitle="Yes!"
            /> */
    }
    //         </X.Entrance>
    //       </View>
    //     </BasePage>
    //   );
  }
};

const styles = StyleSheet.create({
  setupDevicesContainer: {
    backgroundColor: '#080808',
    height: '100%',
    width: '100%',
  },
  setupDevicesHeader: {
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  },
  setupDevicesOptions: {
    marginTop: '10%',
  },
  setupDeviceOptionEON: {
    backgroundColor: 'rgba(255,255,255,.1)',
    borderRadius: 8,
    height: 240,
    marginBottom: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  setupDeviceOptionEONImage: {
    maxHeight: 120,
    marginBottom: 20,
    width: '80%',
  },
  setupDeviceOptionPanda: {
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,.1)',
    borderRadius: 8,
    flexDirection: 'row',
    height: 160,
    width: '100%',
  },
  setupDeviceOptionPandaImage: {
    maxWidth: 100,
  },
  setupDeviceOptionPandaText: {
    alignSelf: 'center',
    paddingLeft: '8%',
  },
  setupDeviceOptionShopText: {
    textAlign: 'center',
  },
  setupDeviceContainer: {
    width: '100%',
  },
  setupDeviceHeader: {
    alignItems: 'center',
    height: 50,
  },
  setupDeviceBody: {
    paddingLeft: '3%',
    paddingRight: '3%',
  },
  setupDeviceBodyCentered: {
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '20%',
  },
  setupDeviceIntroBodyItem: {
    marginTop: '10%',
  },
  setupDeviceIntroBodyItemHeader: {
    marginBottom: '3.5%',
  },
  setupEonPairingContainer: {
    height: '100%',
    width: '100%',
  },
  setupEonPairingCamera: {
    backgroundColor: 'rgba(255,255,255,.02)',
    height: '50%',
  },
  setupEonPairingInstruction: {
    alignItems: 'center',
    height: '30%',
    justifyContent: 'center',
    padding: '15%',
    paddingBottom: '5%',
    paddingTop: 0,
    fontSize: 30,
  },
  setupEonPairingInstructionHdr: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 30,
    fontWeight: '700',
  },
  setupEonPairingInstructionText: {
    marginTop: '6%',
    marginBottom: '12%',
    textAlign: 'center',
    color: '#aaa',
    fontSize: gStyles.text.small,
  },
  setupEonPairingInstructionButton: {
    backgroundColor: '#fff',
    borderRadius: 30,
    height: 60,
    width: 60,
  },
  setupDeviceInstallPrepContainer: {
    height: '100%',
    width: '100%',
  },
  setupDeviceInstallPrepHeader: {},
  setupDeviceInstallPrepBody: {
    justifyContent: 'center',
    flex: 1,
  },
  setupDeviceInstallSteps: {
    borderTopColor: 'rgba(255,255,255,.2)',
    borderTopWidth: 1,
    paddingTop: 20,
  },
  setupDeviceInstallStep: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
  },
  setupDeviceInstallStepNumber: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    height: 26,
    justifyContent: 'center',
    width: 26,
  },
  setupDeviceInstallStepCopy: {
    paddingLeft: 15,
    paddingRight: 20,
  },
  setupDeviceInstallVideo: {
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderRadius: 8,
    borderWidth: 10,
    marginTop: 10,
    marginBottom: 30,
    height: 200,
    width: '100%',
    alignSelf: 'center',
  },
  setupDeviceInstallVideoCover: {
    borderRadius: 8,
    height: 148,
  },
  setupDeviceInstallVideoButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
    height: 40,
    paddingTop: 10,
  },
});
