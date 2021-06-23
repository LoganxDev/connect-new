import React, {useEffect, useRef} from 'react';
import {View, Animated, Easing, StyleSheet} from 'react-native';

import X from '../../theme';
import {Assets} from '../../constants';

export default PortableSpinner = ({message, isStatic}) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isStatic) {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 900,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    }
  }, []);

  let rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  let transformStyle = {transform: [{rotate: rotation}]};
  return (
    <View style={[styles.spinnerContainer]}>
      {!isStatic && (
        <Animated.View style={[styles.spinnerCircle, transformStyle]}>
          <X.Image source={Assets.spinnerCircle} />
        </Animated.View>
      )}
      <View style={styles.spinnerComma}>
        <X.Image source={Assets.spinnerComma} />
      </View>
      <View style={styles.spinnerMessage}>
        {message ? (
          <X.Text color="white" weight="semibold">
            {message}
          </X.Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  spinnerContainer: {
    minHeight: 180,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  spinnerCircle: {
    height: 100,
    width: 100,
    top: -28,
    position: 'absolute',
  },
  spinnerComma: {
    height: 48,
    width: 48,
    top: 0,
    position: 'absolute',
  },
  spinnerMessage: {
    top: 90,
    position: 'absolute',
  },
});
