import React, {useContext} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {GoogleSigninButton} from '@react-native-community/google-signin';

import {signIn} from '../../actions/Auth';
import {AuthContext} from '../../contexts/AuthContext';
import Assets from '../../constants/assets';

export default Intro = () => {
  const {dispatch} = useContext(AuthContext);

  const handleSigninButtonPress = async () => {
    const auth = await signIn();
    if (auth !== null) {
      dispatch({type: 'SIGN_IN', payload: auth});
    }
  };

  return (
    <View style={styles.page}>
      <View style={{marginTop: '60%', marginBottom: '15%'}}>
        <Image
          source={Assets.commaWhite}
          style={{width: 71, height: 127}}></Image>
      </View>
      <Text style={{color: '#fff', fontSize: 30, marginBottom: 20}}>
        {' '}
        Welcome to comma
      </Text>
      <Text style={{color: '#bbb', fontSize: 25, marginBottom: 150}}>
        Drive Chill
      </Text>

      <GoogleSigninButton
        onPress={handleSigninButtonPress}></GoogleSigninButton>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#080808',
  },
});
