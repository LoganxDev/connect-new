import React from 'react';

import AuthContextProvider from '../contexts/AuthContext';
import DeviceContextProvider from '../contexts/DeviceContext';
import DevicesContextProvider from '../contexts/DevicesContext';
import MainNav from './MainNav';

const RootNavWrapper = () => {
  return (
    <AuthContextProvider>
      <DeviceContextProvider>
        <DevicesContextProvider>
          <MainNav />
        </DevicesContextProvider>
      </DeviceContextProvider>
    </AuthContextProvider>
  );
};

export default RootNavWrapper;
