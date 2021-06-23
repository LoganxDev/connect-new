import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Home from '../pages/Home/Home';
import SidebarContent from '../components/Sidebar/SidebarContent';

const Drawer = createDrawerNavigator();

export default LeftDrawerNav = () => {
  return (
    <Drawer.Navigator
      headerMode="none"
      initialRouteName="Home"
      drawerContent={SidebarContent}>
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
};
