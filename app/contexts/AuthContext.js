import React, {createContext, useEffect, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from '../reducers/auth';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [auth, dispatch] = useReducer(authReducer, {});

  useEffect(() => {
    // Do work to store auth data
    try {
      // TODO I think only the token needs to be stored
      if (auth === undefined || auth.user === undefined) {
        return;
      }
      const jsonAuth = JSON.stringify(auth);
      AsyncStorage.setItem('user', jsonAuth);
    } catch (e) {
      console.log('error setting auth: ' + e);
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{auth, dispatch}}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
