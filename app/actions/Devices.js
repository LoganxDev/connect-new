// Devices Async Actions
// ~~~~~~~~~~~~~~~~~~~~~

// import * as Sentry from '@sentry/react-native';
import * as BillingApi from '../api/billing';
import * as Geocoding from '../api/geocoding';
import * as DevicesApi from '../api/devices';
import * as AthenaApi from '../api/athena';

export const fetchDevices = async () => {
  let devices = await DevicesApi.listDevices();
  if (!devices) {
    console.log('No Devices');
    return devices;
  }

  devices = devices.filter((device) => device?.device_type !== 'panda');
  let devicesById = devices.reduce((obj, device) => {
    device.fetched_at = parseInt(Date.now() / 1000);
    obj[device.dongle_id] = device;
    return obj;
  }, {});

  devicesById = await fetchDeviceLocations(devicesById);
  console.log(devicesById)
  return devicesById;
};

export const takeDeviceSnapshot = async (dongleId) => {
  const resp = await AthenaApi.postJsonRpcPayload(dongleId, {
    method: 'takeSnapshot',
    jsonrpc: '2.0',
    id: 0,
  });
  if (resp) {
    if ('error' in resp) {
      let error = {message: resp.error.message};
      if (resp.error.message === 'Method not found') {
        error.message =
          'Snapshot requires device version 0.6.5 or newer. Please upgrade and try again.';
      } else {
        error.message = 'Snapshot unavailable.';
        console.error('snapshot error: ' + error.message);
      }
      return error;
    } else {
      return resp.result;
    }
  }
};

export const fetchDeviceSimInfo = async (dongleId) => {
  const resp = await AthenaApi.postJsonRpcPayload(dongleId, {
    method: 'getSimInfo',
    jsonrpc: '2.0',
    id: 0,
  });

  if (resp) {
    let simInfo = resp['result'];
    let simIdIsValid =
      simInfo &&
      simInfo.sim_id !== null &&
      simInfo.sim_id.length >= 19 &&
      simInfo.sim_id.length <= 22;

    if ('error' in resp || !simIdIsValid) {
      if (!simIdIsValid) {
        resp['error'] =
          'No SIM detected. Ensure SIM is securely inserted and try again.';
      } else if (
        resp['error'] === 'Device not registered' ||
        resp['error'] === 'Timed out'
      ) {
        resp['error'] =
          'Could not reach device.\nConnect device to the internet and try again.';
      } else if (
        typeof resp['error'] === 'object' &&
        resp['error']['message'] === 'Method not found'
      ) {
        resp['error'] =
          'Activation requires device version 0.6.1 or newer. Please upgrade and try again.';
      } else {
        resp['error'] = 'Server error. Please try again.';
      }
      return resp;
    } else {
      return {simInfo};
    }
  }
};

export const setDeviceAlias = async (dongleId, alias) => {
  try {
    await DevicesApi.setDeviceAlias(dongleId, alias);
  } catch (err) {
    console.log(err);
  }
};

export const fetchDeviceCarHealth = async (dongleId) => {
  try {
    const resp = await AthenaApi.post(dongleId, {
      method: 'getMessage',
      params: {service: 'health', timeout: 5000},
      jsonrpc: '2.0',
      id: 0,
    });
    if ('error' in resp) {
      let error = {message: resp.error.message};
      console.error('car health: ' + error.message);
    } else {
      return resp.result;
    }
  } catch (err) {
    console.error(err);
  }
};

export const pilotPair = async (imei, serial, pairToken) => {
  try {
    const resp = await DevicesApi.pilotPair(imei, serial, pairToken);
    return JSON.parse(resp).dongle_id;
  } catch (err) {
    Sentry.captureException(err);
    console.log('pilotPair failed', {imei, serial, pairToken}, err);
    throw err;
  }
};

export const fetchDeviceLocations = async devices => {
  devs = Object.values(devices)
  for (d of devs) {
    d.location = await fetchDeviceLocation(d.dongle_id);
  }
  return devs;
}

export const fetchDeviceLocation = async dongleId => {
  try {
    const location = await DevicesApi.fetchLocation(dongleId)
    console.log(location);
    return location;
  } catch (err) {
    console.log('fetchDeviceLocations failed', err);
  }
}

export const getMostRecentDevice = (devices, dispatch) => {
  // This should be removed and instead have a primary bool on a device
  let mostRecentTimeStamp = Number.MAX_VALUE;
  let mostRecentKey = '';
  if (devices === undefined) {
    console.error('no devices');
    return;
  }
  for (key in devices) {
    if (devices[key]?.last_athena_ping < mostRecentTimeStamp) {
      mostRecentTimeStamp = devices[key]?.last_athena_ping;
      mostRecentKey = key;
    }
  }
  const device = devices[key];
  dispatch({type: 'ACTION_FETCHED_DEVICE', payload: {device}});
};

export function fetchDeviceSubscriptions() {
  return (dispatch, getState) => {
    const {devices} = getState().devices;

    Object.values(devices).map((device) => {
      dispatch(fetchDeviceSubscription(device.dongle_id));
    });
  };
}

export function fetchDeviceStats(dongleId) {
  return async (dispatch, getState) => {
    try {
      const stats = await DevicesApi.fetchDeviceStats(dongleId);
      dispatch(deviceStatsFetched(dongleId, stats));
    } catch (err) {
      Sentry.captureException(err);
      console.log('device stats fetch failed', dongleId, err);
    }
  };
}

export function unpairDevice(dongleId) {
  return async (dispatch) => {
    try {
      await DevicesApi.unpair(dongleId);
      dispatch(deviceUnpaired(dongleId));
    } catch (err) {
      Sentry.captureException(err);
      console.log('unpairDevice failed', dongleId, err);
    }
  };
}
