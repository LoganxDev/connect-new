import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default DeviceSnapshotView = (props) => {
  const [snapshot, setSnapshot] = useState(null);

  return (
    <View style={styles.page}>
      {snapshot === null ? (
        <Text style={{color: 'red', fontSize: 20}}> Snapshot unvailable. </Text>
      ) : (
        <Text style={{color: 'red', fontSize: 20}}> {snapshot.message} </Text>
        // <View style={styles.devicePhoto}>{snapshot.message}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212121',
  },
  devicePhoto: {
    backgroundColor: '#131313',
    justifyContent: 'center',
    minHeight: 120,
    minWidth: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
});
