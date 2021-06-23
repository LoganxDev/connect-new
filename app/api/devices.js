// Devices API
// ~~~~~~~~~~~

import * as fetchWrapper from './fetchWrapper';
import {COMMA_URL_ROOT} from './config';

let accessToken = '';

export const setToken = (token) => {
  accessToken = token;
};

// PATCH

export const setDeviceAlias = (dongle_id, alias) => {
  return fetch(COMMA_URL_ROOT + 'v1/devices/' + dongle_id + '/', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'JWT ' + accessToken,
    },
    body: JSON.stringify({alias}),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json) {
        return json;
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

export const setDeviceVehicleId = (dongle_id, vehicle_id) => {
  return fetch(COMMA_URL_ROOT + 'v1/devices/' + dongle_id + '/', {
    method: 'PATCH',
    headers: {
      Authorization: 'JWT ' + accessToken,
    },
    body: JSON.stringify({vehicle_id}),
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((err) => {
      console.error(err);
    });
};

// POST

export const grantDeviceReadPermission = (dongle_id, email) => {
  return fetch(COMMA_URL_ROOT + 'v1/devices/' + dongle_id + '/add_user', {
    method: 'POST',
    headers: {
      Authorization: 'JWT ' + accessToken,
    },
    body: JSON.stringify({email}),
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const removeDeviceReadPermission = (dongle_id, email) => {
  return fetch(COMMA_URL_ROOT + 'v1/devices/' + dongle_id + '/del_user', {
    method: 'POST',
    headers: {
      Authorization: 'JWT ' + accessToken,
    },
    body: JSON.stringify({email}),
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const unpair = (dongle_id) => {
  return fetch(COMMA_URL_ROOT + 'v1/devices/' + dongle_id + '/unpair', {
    method: 'POST',
    headers: {
      Authorization: 'JWT ' + accessToken,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const pilotPair = (imei, serial, pair_token) => {
  return fetch(COMMA_URL_ROOT + 'v2/pilotpair/', {
    method: 'POST',
    headers: {
      Authorization: 'JWT ' + accessToken,
    },
    body: JSON.stringify({imei, serial, pair_token}),
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((err) => {
      console.error(err);
    });
};

// Old version just in case above doesn't work :)
// export function pilotPair(imei, serial, pairToken) {
//   return request.postForm('v2/pilotpair/', { imei, serial, pair_token: pairToken });
// }

// GET

export const listDevices = async () => {
  return await fetchWrapper.get(accessToken, COMMA_URL_ROOT + 'v1/me/devices/');
};

export const fetchLocation = async dongleId => {
  return await fetchWrapper.get(
    accessToken,
    COMMA_URL_ROOT + 'v1/devices/' + dongleId + '/location',
  );
};

export const fetchLocationWithEndpoint = (endpoint) => {
  return fetch(COMMA_URL_ROOT + endpoint, {
    method: 'GET',
    headers: {
      Authorization: 'JWT ' + accessToken,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const fetchVehicles = (vehicleId) => {
  return fetch(COMMA_URL_ROOT + 'v1/vehicles/' + vehicleId, {
    method: 'GET',
    headers: {
      Authorization: 'JWT ' + accessToken,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const fetchDevice = (dongleId) => {
  return fetch(COMMA_URL_ROOT + 'v1.1/devices/' + dongleId + '/', {
    method: 'GET',
    headers: {
      Authorization: 'JWT ' + accessToken,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const fetchDeviceStats = (dongleId) => {
  return fetch(COMMA_URL_ROOT + 'v1.1/devices/' + dongleId + '/stats', {
    method: 'GET',
    headers: {
      Authorization: 'JWT ' + accessToken,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const fetchDeviceOwner = (dongleId) => {
  return fetch(COMMA_URL_ROOT + 'v1.1/devices/' + dongleId + '/owner', {
    method: 'GET',
    headers: {
      Authorization: 'JWT ' + accessToken,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((err) => {
      console.error(err);
    });
};
