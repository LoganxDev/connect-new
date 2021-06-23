import React from 'react';
import {View, StyleSheet} from 'react-native';

const isOnline = true;
const DeviceStatusIndicator = () => {
  return (
    // {
    //   isOnline ?
    //     <View></View>
    //   :
    //     <View></View>
    // }
    <View></View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#212121',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    right: '4%',
    top: '8%',
    height: 50,
    width: 50,
    color: '#fff',
  },
});
