import React, { useEffect, useState } from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import { opacity } from 'react-native-redash';

import gStyles from '../../constants/styles';

export default WideButton = ({disabled, onPress, text, style, textStyle}) => {
  const [buttonOpacity, setButtonOpacity] = useState(1);
  useEffect(() => {
    if (disabled) {
      setButtonOpacity(0.5)
    } else {
      setButtonOpacity(1)
    }
  }, [disabled]);
  return (
    <TouchableOpacity
      style={[styles.buttonWrap]}
      activeOpacity={disabled ? 1 : 0.2}
      onPress={disabled ? () => {} : onPress}>
      <View
        style={[styles.button, style, {opacity: buttonOpacity}]}>
        <Text style={[styles.buttonText, textStyle]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonWrap: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    color: '#fff',
  },
  button: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 50,
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontSize: gStyles.text.small,
    fontWeight: '500',
  },
});
