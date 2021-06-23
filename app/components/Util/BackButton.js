import React from 'react';
import {View, Image, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Assets} from '../../constants';

export default BackButton = (props) => {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        props?.backPage
          ? navigation.navigate(props.backPage)
          : navigation.goBack();
      }}>
      <View style={styles.button}>
        <Image
          source={Assets.iconChevronLeft}
          style={{resizeMode: 'contain', height: 20, width: 20}}></Image>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    color: '#fff',
  },
});
