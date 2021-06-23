import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

import SidebarItem from './SidebarItem';
import Assets from '../../constants/assets';

const {height} = Dimensions.get('screen');

{/* <div>Icons made by <a href="https://www.flaticon.com/authors/those-icons" title="Those Icons">Those Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}

export default SidebarList = (props) => {
  return (
    <View style={styles.container}>
      <SidebarItem
        asset={Assets.iconComma}
        text="comma prime"
        link="PrimeNav"></SidebarItem>
      <SidebarItem
        asset={Assets.iconHistory}
        text="Past Drives"
        link="DrivesNav"></SidebarItem>
      {/* <SidebarItem asset={Assets.iconCog} text="Settings" link="Settings"></SidebarItem>
      <SidebarItem asset={Assets.iconError} text="Support" link="SupportNav"></SidebarItem> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
    width: '100%',
    paddingTop: height/50
  },
});
