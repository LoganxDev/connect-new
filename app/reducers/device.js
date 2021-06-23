// Devices Reducers
// ~~~~~~~~~~~~~~~~

import { isDeviceOnline } from '../utils/device';

const initialDeviceState = {
  deviceStats: {},
  devicesDriveTimeSorted: [],
  deviceLocations: {},
  deviceSnapshots: {},
  activeDeviceLocationFetches: {},
  subscription: {},
  isSettingUpDevice: false
};

export default deviceReducer = (state = initialDeviceState, action) => {
  switch (action.type) {
    case 'ACTION_FETCHED_DEVICE':
      let  { device } = action.payload;
      return {
        ...state,
        device
      }
    case 'ACTION_DEVICES_RESET':
      return {
        ...initialDeviceState,
      }
    case 'ACTION_DEVICES_FETCHED':
      const { devices } = action.payload.devices;

      return {
        ...state,
        isFetchingDevices: false,
        devices,
        devicesDriveTimeSorted: Object.values(devices)
          .sort((d1, d2) => (isDeviceOnline(d2) | 0)  - (isDeviceOnline(d1) | 0))
          .map(d => d.dongle_id)
      }
    case ACTION_DEVICE_SETUP_STARTED:
      return {
        ...state,
        isSettingUpDevice: true,
      }
    case ACTION_DEVICE_SETUP_FINISHED:
      return {
        ...state,
        isSettingUpDevice: false,
      }
    case ACTION_DEVICE_SUBSCRIPTION_FETCHED:
      return {
        ...state,
        subscriptions: {
          ...state.subscriptions,
          [action.payload.dongleId]: action.payload.subscription
        }
      }
    default:
      return state;
  }
}
