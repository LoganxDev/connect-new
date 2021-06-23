import React, {useContext, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AuthNav from './AuthNav';
import LeftDrawerNav from './LeftDrawerNav';
import Device from '../pages/Device/Device';
import PrimeNav from './PrimeNav';
import DrivesNav from './DrivesNav';
import SupportNav from './SupportNav';
import RouteSearch from '../pages/RouteSearch/RouteSearch';
import Settings from '../pages/Settings/Settings';
import Loader from '../pages/Loader/Loader';
import DeviceSettings from '../pages/Device/DeviceSettings';
import EditSetting from '../pages/Util/EditSetting';
import DevicesOverview from '../pages/Device/DevicesOverview';
import PairDevice from '../pages/Device/PairDevice';
import DefaultDevicePick from '../pages/Device/DefaultDevicePick';

import {AuthContext} from '../contexts/AuthContext';

const Stack = createStackNavigator();

const MainNav = () => {
  const {auth} = useContext(AuthContext);

  return (
    <>
      {auth === undefined || auth.user === undefined ? (
        <Stack.Navigator
          headerMode="none"
          screenOptions={{animationEnabled: false}}>
          <Stack.Screen
            name="Loader"
            component={Loader}
            options={{animationEnabled: false}}
          />
          <Stack.Screen name="AuthNav" component={AuthNav} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator headerMode="none">
          <Stack.Screen
            name="LeftDrawerNav"
            component={LeftDrawerNav}
            options={{animationEnabled: false}}
          />
          <Stack.Screen name="Device" component={Device} />
          <Stack.Screen name="DeviceSettings" component={DeviceSettings} />
          <Stack.Screen name="DevicesOverview" component={DevicesOverview} />
          <Stack.Screen
            name="DefaultDevicePick"
            component={DefaultDevicePick}
          />
          <Stack.Screen name="PairDevice" component={PairDevice} />
          <Stack.Screen name="EditSetting" component={EditSetting} />
          <Stack.Screen name="PrimeNav" component={PrimeNav} />
          <Stack.Screen name="DrivesNav" component={DrivesNav} />
          <Stack.Screen name="SupportNav" component={SupportNav} />
          <Stack.Screen
            name="RouteSearch"
            component={RouteSearch}
            options={{animationEnabled: false}}
          />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      )}
    </>
  );
};

export default MainNav;
