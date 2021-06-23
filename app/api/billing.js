import qs from 'querystringify';

let COMMA_BILLING_ROOT;
if (__DEV__) {
  COMMA_BILLING_ROOT = 'http://192.168.1.101:5000/';
} else {
  COMMA_BILLING_ROOT = 'https://billing.comma.ai/';
}

export const setToken = (token) => {
  accessToken = token;
};

const ensureInit = () => {
  if (!accessToken) {
    throw new Error(
      'Must call configure with an access token before using API',
    );
  }
};

export const getSubscription = dongle_id => {
  return get('v1/prime/subscription?' + qs.stringify({dongle_id}));
};

export const payForPrime = (dongleId, simId, stripeToken) => {
  return post('v1/prime/pay', {
    dongle_id: dongleId,
    sim_id: simId,
    stripe_token: stripeToken,
  });
};

export const getPaymentMethod = () => {
  return get('v1/prime/payment_source');
};

export const updatePaymentMethod = stripe_token => {
  return post('v1/prime/payment_source', {stripe_token});
};

export const cancelPrime = dongle_id => {
  return post('v1/prime/cancel', {dongle_id});
};

export const get = async endpoint => {
  ensureInit();
  return fetch(COMMA_BILLING_ROOT + endpoint, {
    method: 'GET',
    headers: {
      Authorization: 'JWT ' + accessToken,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const post = async (endpoint, data) => {
  ensureInit();

  return fetch(COMMA_BILLING_ROOT + endpoint, {
    method: 'POST',
    headers: {
      Authorization: 'JWT ' + accessToken,
    },
    body: data,
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((err) => {
      console.error(err);
    });
};
