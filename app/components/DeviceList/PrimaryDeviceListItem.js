import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

import {Assets} from '../../constants';
import gStyles from '../../constants/styles';

export default PrimaryDeviceListItem = ({
  device,
  onChange,
  customStyles,
  isPrimary,
  index,
}) => {
  const handlePress = () => {
    onChange(device);
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
        {isPrimary && (
          <Image
            source={Assets.commaWhite}
            style={{
              resizeMode: 'contain',
              height: 30,
              width: 30,
            }}></Image>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#191919',
    width: '100%',
    height: 90,
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
  primary: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    width: '30%',
  },
});
