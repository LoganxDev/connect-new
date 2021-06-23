import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SupportHome from '../pages/Support/SupportHome';

const Stack = createStackNavigator();

export default SupportNav = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="SupportHome">
      <Stack.Screen name="SupportHome" component={SupportHome} />
    </Stack.Navigator>
  );
};
