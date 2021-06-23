import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Assets} from '../../constants';
import gStyles from '../../constants/styles';

const {height} = Dimensions.get('screen');

export default AddDeviceButton = ({device}) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('PairDevice');
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        <Image
          source={Assets.iconPlusCircle}
          style={{resizeMode: 'contain', height: 40, width: 30}}
        />
        <Text style={{marginLeft: 20, fontSize: gStyles.text.small, color: '#fff'}}>
          Add Device
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#191919',
    width: '100%',
    height: height/12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 15,
    borderBottomColor: '#555',
    borderBottomWidth: 1,
  },
  deviceAlias: {
    color: '#fff',
    fontSize: 25,
    textAlign: 'left',
    marginBottom: 10,
  },
  dongleId: {
    color: '#ccc',
    fontSize: 20,
    textAlign: 'left',
  },
});
