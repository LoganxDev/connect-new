import React, {createContext, useReducer} from 'react';

import devicesReducer from '../reducers/devices';

export const DevicesContext = createContext();

const DevicesContextProvider = (props) => {
  const [devices, devicesDispatch] = useReducer(devicesReducer, {});

  return (
    <DevicesContext.Provider value={{devices, devicesDispatch}}>
      {props.children}
    </DevicesContext.Provider>
  );
};

export default DevicesContextProvider;
