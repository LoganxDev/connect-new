import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import Assets from '../../constants/assets';

export default SidebarFooter = (props) => {
  return (
    <View style={styles.container}>
      {/* <Image source={{ uri: auth.user.photo }}></Image> */}
      <Image
        source={Assets.iconUser}
        style={{width: 70, height: 70, marginBottom: 20}}></Image>
      <Text style={styles.name}>build number: 0.0.1</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '20%',
  },
  name: {
    color: '#bbb',
    fontSize: 35,
  },
});
