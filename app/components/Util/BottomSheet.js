import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import gStyles from '../../constants/styles';

import {Assets} from '../../constants';

const {width, height} = Dimensions.get('screen');

const BottomSheet = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('RouteSearch');
          }}>
          <View style={[styles.section, styles.leftSection]}>
            <Image
              source={Assets.iconSearch}
              style={{resizeMode: 'contain', height: 40, width: 30}}></Image>
            <Text style={[styles.text, gStyles.mediumText]}>Search</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('Device');
          }}>
          <View style={styles.section}>
            <Image
              source={Assets.drawingEon}
              style={{resizeMode: 'contain', height: 65, width: 50}}></Image>
            <Text style={styles.text}>Device</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    position: 'absolute',
    alignItems: 'center',
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
    width: width,
  },
  innerContainer: {
    height: '70%',
    width: '100%',
    flexDirection: 'row',
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
  },
  textContainer: {
    backgroundColor: '#323232',
    justifyContent: 'center',
    height: '60%',
    width: '90%',
    paddingLeft: 20,
  },
  text: {
    fontSize: gStyles.text.medium,
    color: gStyles.text.secondary,
    marginLeft: 10,
  },
  section: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  leftSection: {
    borderRightColor: '#bbb',
    borderRightWidth: 1,
  },
});

export default BottomSheet;
