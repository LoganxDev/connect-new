import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import PrimeSignup from '../pages/Prime/PrimeSignup';
import PrimeDevicePick from '../pages/Prime/PrimeDevicePick';
import PrimePayment from '../pages/Prime/PrimePayment';
import PrimeSimSpinner from '../pages/Prime/PrimeSimSpinner';
import PrimeActivationSpinner from '../pages/Prime/PrimeActivationSpinner';
import PrimeActivationDone from '../pages/Prime/PrimeActivationDone';

const Stack = createStackNavigator();

export default PrimeNav = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="PrimeSignup">
      <Stack.Screen name="PrimeSignup" component={PrimeSignup} />
      <Stack.Screen name="PrimeDevicePick" component={PrimeDevicePick} />
      <Stack.Screen name="PrimePayment" component={PrimePayment} />
      <Stack.Screen name="PrimeSimSpinner" component={PrimeSimSpinner} />
      <Stack.Screen name="PrimeActivationSpinner" component={PrimeActivationSpinner} />
      <Stack.Screen name="PrimeActivationDone" component={PrimeActivationDone} />
    </Stack.Navigator>
  );
};
