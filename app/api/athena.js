import {ATHENA_URL_ROOT} from './config';

let accessToken = '';

export const setToken = (token) => {
  accessToken = token;
};

export function postJsonRpcPayload(dongleId, payload) {
  return post(dongleId, payload);
}

export const post = (dongleId, payload) => {
  return fetch(ATHENA_URL_ROOT + dongleId, {
    method: 'POST',
    headers: {
      Authorization: 'JWT ' + accessToken,
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((json) => {
      // console.log(json)
      return json;
    })
    .catch((err) => {
      console.error(err);
    });
};
