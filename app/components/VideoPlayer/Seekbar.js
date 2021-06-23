import React, {useState, useRef} from 'react';
import {useEffect} from 'react';
import {StyleSheet, Animated, PanResponder, View} from 'react-native';

export default Seekbar = ({granted, released, seek, seekColor, duration}) => {
  const [fillWidth, setFillWidth] = useState(0);
  const [seekbarWidth, setSeekbarWidth] = useState(0);
  const [seekerPosition, setSeekerPosition] = useState(0);
  const seekbarPan = useRef(new Animated.ValueXY()).current;
  const seekbarPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        seekbarPan.setOffset({x: seekbarPan.x._value});
        granted();
      },
      onPanResponderMove: Animated.event([null, {dx: seekbarPan.x}], {
        useNativeDriver: false,
        listener: (e) => {
          setSeekerPosition(
            seekbarPan.x.interpolate({
              inputRange: [0, 100],
              outputRange: [0, 100],
              extrapolate: 'clamp',
            }),
          );
        },
      }),
      onPanResponderRelease: () => {
        seekbarPan.flattenOffset();
        const time = calculateTimeFromSeekerPosition();
        if (time >= duration) {
          onEnd();
          // } else if ( state.scrubbing ) {
          //     state.seeking = false;
          //     this.props.onSeek(time);
        } else {
          seekTo(time);
          // state.seeking = false;
        }
        released();
      },
    }),
  ).current;

  const calculateTimeFromSeekerPosition = () => {
    const percent = seekerPosition / seekbarWidth;
    return duration * percent;
  };

  const seekTo = (time = 0) => {
    currentTime = time;
    seek(time);
  };

  useEffect(() => {
    setFillWidth(seekerPosition);
  }, [seekerPosition]);

  useEffect(() => {
    console.log(seekbarWidth);
  }, [seekbarWidth]);

  return (
    <View style={styles.container}>
      <View
        style={styles.track}
        onLayout={(e) => setSeekbarWidth(e.nativeEvent.layout.width)}>
        {/* <View
          style={[
            styles.fill,
            {
              width: fillWidth,
            },
          ]}
        /> */}
      </View>
      <Animated.View
        style={{
          width: '90%',
          transform: [{translateX: seekerPosition}],
        }}
        {...seekbarPanResponder.panHandlers}>
        <View style={styles.circle} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: 28,
    marginLeft: 20,
    marginRight: 20,
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    // width: '100%',
    alignItems: 'center',
  },
  track: {
    height: 2,
    // position: 'relative',
    top: 16,
    width: '90%',
    backgroundColor: '#888',
  },
  fill: {
    height: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  handle: {
    position: 'absolute',
    marginLeft: -7,
    height: 28,
    width: 28,
  },
  circle: {
    borderRadius: 12,
    position: 'relative',
    top: 8,
    left: 0,
    // right: 0,
    height: 13,
    width: 13,
    backgroundColor: '#fff',
  },
});
