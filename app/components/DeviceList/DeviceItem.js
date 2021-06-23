import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';

import {Assets} from '../../constants';
import gStyles from '../../constants/styles';

const {height} = Dimensions.get('screen');

export default DeviceItem = ({
  device,
  onPress,
  customStyles,
  index,
  showArrow,
  showInfo,
}) => {
  const handlePress = () => {
    onPress(device);
  };

  const topBorderStyles =
    index == 0 ? {borderTopColor: '#555', borderTopWidth: 1} : {};

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View
        style={[
          styles.container,
          customStyles,
          topBorderStyles,
          {flexDirection: 'row', alignItems: 'center'},
        ]}>
        <View>
          <Text style={styles.deviceAlias}>{device.alias}</Text>
          <Text style={styles.dongleId}>Dongle ID: {device.dongle_id}</Text>
        </View>
        {showArrow && (
          <Image
            source={Assets.iconChevronLeft}
            style={{
              transform: [{rotate: '180deg'}],
              resizeMode: 'contain',
              height: 15,
              width: 15,
            }}></Image>
        )}
        {showInfo && (
          <View style={styles.circle}>
            <Text style={styles.info}>i</Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#191919',
    width: '100%',
    height: height/12,
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomColor: '#555',
    borderBottomWidth: 1,
  },
  deviceAlias: {
    color: '#fff',
    fontSize: gStyles.text.small,
    textAlign: 'left',
    marginBottom: 10,
  },
  dongleId: {
    color: '#ccc',
    fontSize: gStyles.text.tiny,
    textAlign: 'left',
  },
  circle: {
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 80,
    width: 30,
    height: 30,
    justifyContent: 'center',
  },
  info: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
});
