// Devices Reducers
// ~~~~~~~~~~~~~~~~

import {
  ACTION_DEVICES_RESET,
} from '../actions/Devices';

const initialDevicesState = {
  devices: {},
  devicesDriveTimeSorted: [],
  deviceLocations: {}
};

export default devicesReducer = (state = initialDevicesState, action) => {
  switch (action.type) {
    case 'ACTION_DEVICES_RESET':
      return {
        ...initialDevicesState,
      }
    case 'ACTION_DEVICES_FETCHED':
      const devices = action.payload;
      return {
        ...state,
        devices,
        devicesDriveTimeSorted: Object.values(devices)
          .sort((d1, d2) => (isDeviceOnline(d2) | 0)  - (isDeviceOnline(d1) | 0))
      }
    default:
      return state;
  }
}
