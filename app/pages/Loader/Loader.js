import React, { useContext, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { rehydrateAuth } from '../../actions/Auth';
import { AuthContext } from '../../contexts/AuthContext';
import Assets from '../../constants/assets';

export default Loader = () => {
  const { auth, dispatch } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    const rehydrate = async () => {
      const hydration = await rehydrateAuth();
      if (hydration?.commaUser) {
        dispatch({type: 'SIGN_IN', payload: hydration});
      }
    }

    if (auth.user === undefined) {
      rehydrate();
    }
    if(auth.commaUser) {
      if (terms && terms.version > acceptedTermsVersion) {
        navigation.navigate('Terms');
      } else {
        navigation.navigate('LeftDrawerNav');
      }
    } else {
      navigation.navigate('AuthNav');
    }
  });

  return (
    <View style={ { flex: 1, alignItems: "center", backgroundColor: '#080808' } }>
      <View style={{marginTop: '60%', marginBottom: '15%'}}>
        <Image source={Assets.commaWhite} style={{width: 71, height: 127}}></Image>
      </View>
      <Text style={{color: "#fff", fontSize: 30, marginBottom: 20}}> Loading Page :)</Text>
      <Text style={{color: "#bbb", fontSize: 25}}>Drive Chill</Text>
    </View>
  );

}
