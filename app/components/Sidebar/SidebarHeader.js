import React, {useContext} from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';

import {AuthContext} from '../../contexts/AuthContext';
import Assets from '../../constants/assets';
import gStyles from '../../constants/styles';

const {height} = Dimensions.get('screen');

export default SidebarHeader = () => {
  const {auth} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      {auth !== undefined && auth.user !== undefined ? (
        <>
          <Image
            source={{uri: auth.user.photo}}
            style={{
              width: 100,
              height: 100,
              marginBottom: 20,
              borderRadius: 50,
            }}></Image>
          <Text style={styles.name}>{auth.user.first_name}</Text>
        </>
      ) : (
        <>
          <Image
            source={Assets.iconUser}
            style={{width: 70, height: 70, marginBottom: 20}}></Image>
        </>
      )}
      <View style={styles.headerLine}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height/5,
    width: '100%',
    alignItems: 'center',
  },
  headerLine: {
    height: 5,
    width: '100%',
    borderBottomColor: '#555',
    borderBottomWidth: 1,
    alignSelf: 'flex-end',
  },
  name: {
    color: gStyles.text.secondary,
    fontSize: gStyles.text.medium,
    marginBottom: 20,
  },
});
