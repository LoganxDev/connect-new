import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import DrivesHome from '../pages/Drives/DrivesHome';
import DrivePlayback from '../pages/Drives/DrivePlayback.js';

const Stack = createStackNavigator();

export default DrivesNav = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="DrivesHome">
      <Stack.Screen name="DrivesHome" component={DrivesHome} />
      <Stack.Screen name="DrivePlayback" component={DrivePlayback} />
    </Stack.Navigator>
  );
};
