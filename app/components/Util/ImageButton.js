import React from 'react';
import {StyleSheet, Image, TouchableWithoutFeedback} from 'react-native';

export default ImageButton = ({onPress, image, width, height}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        onPress();
      }}>
      <Image
        source={image}
        style={[styles.image, {width: width, height, height}]}></Image>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    height: 35,
    width: 35,
  },
});
