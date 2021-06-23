import React from 'react';
import {View, StyleSheet} from 'react-native';

import SidebarHeader from './SidebarHeader';
import SidebarList from './SidebarList';

export default SidebarContent = () => {
  return (
    <View style={styles.container}>
      <SidebarHeader></SidebarHeader>
      <SidebarList></SidebarList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    alignItems: 'center',
    flex: 1,
    paddingTop: 80,
  },
});
