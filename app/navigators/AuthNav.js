import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Intro from '../pages/Auth/Intro';
import Terms from '../pages/Auth/Terms';

const Stack = createStackNavigator();

export default AuthNav = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="Intro"
      screenOptions={{animationEnabled: false}}>
      <Stack.Screen
        name="Intro"
        component={Intro}
        options={{animationEnabled: false}}
      />
      <Stack.Screen
        name="Terms"
        component={Terms}
        options={{animationEnabled: false}}
      />
    </Stack.Navigator>
  );
};
