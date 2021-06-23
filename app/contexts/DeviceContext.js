import React, {createContext, useReducer} from 'react';

import deviceReducer from '../reducers/device';

export const DeviceContext = createContext();

const DeviceContextProvider = (props) => {
  const [device, dispatch] = useReducer(deviceReducer, {});

  return (
    <DeviceContext.Provider value={{device, dispatch}}>
      {props.children}
    </DeviceContext.Provider>
  );
};

export default DeviceContextProvider;
