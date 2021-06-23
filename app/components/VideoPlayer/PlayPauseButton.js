import React from 'react';
import {StyleSheet, Image, TouchableWithoutFeedback} from 'react-native';

export default PlayPauseButton = ({isPaused, onPress}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        onPress();
      }}>
      <Image
        source={
          isPaused
            ? require('../../assets/play.png')
            : require('../../assets/pause.png')
        }
        style={styles.image}></Image>
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
