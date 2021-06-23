import React from 'react';
import {View, TouchableWithoutFeedback, Image, StyleSheet} from 'react-native';

import {Assets} from '../../constants';

export default DeviceButton = ({navigation}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('Device');
      }}>
      <View style={styles.button}>
        <Image
          source={Assets.drawingEon}
          style={{resizeMode: 'contain', height: 40, width: 30}}></Image>
      </View>
    </TouchableWithoutFeedback>
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
