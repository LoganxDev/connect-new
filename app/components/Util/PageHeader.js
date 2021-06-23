import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import gStyles from '../../constants/styles';
import BackButton from './BackButton';

const {width} = Dimensions.get('screen');

export default PageHeader = (props) => {
  return (
    <View style={styles.header}>
      <BackButton backPage={props.backPage}></BackButton>
      {props.title && (
        <View style={styles.centerContainer}>
          <Text style={styles.title} numberOfLines={1}>{props.title}</Text>
        </View>
      )}

      {props.children ? (
        props.children
      ) : (
        <View style={styles.rightContainer}></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 0,
    zIndex: 5000, // For drop down purposes
  },
  title: {
    color: gStyles.text.primary,
    fontSize: gStyles.text.medium,
    textAlign: 'center',
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    maxWidth: width/1.5
  },
  rightContainer: {
    width: 50,
  },
});
