import React from 'react';
import {View, Text, TouchableWithoutFeedback, StyleSheet, Dimensions} from 'react-native';

import gStyles from '../../constants/styles';

const {width, height} = Dimensions.get('screen');

export default SidebarToggleButton = ({navigation}) => {
  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={() => {
        navigation.openDrawer();
      }}>
      <View style={styles.button}>
        <Text
          style={{fontSize: gStyles.text.medium, color: gStyles.text.secondary}}>
          &#9776;
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
    width: height/20,
    height: height/20,
    borderRadius: 8
  },
});
