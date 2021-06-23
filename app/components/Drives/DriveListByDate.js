import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import gStyles from '../../constants/styles';

import DriveItem from './DriveItem';

const DriveListByDate = (props) => {
  const drives = props.drives;

  if (drives.length) {
    const driveItems = drives.map((value, index) => {
      return <DriveItem drive={value} key={index} />;
    });
    return <View style={styles.container}>{driveItems}</View>;
  } else {
    return (
      <Text style={styles.text}>Previous drives will be viewable here.</Text>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#444',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: gStyles.text.small,
    width: '80%',
  },
});

export default DriveListByDate;
