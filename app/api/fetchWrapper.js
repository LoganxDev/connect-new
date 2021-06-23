export const get = (accessToken, endpoint, body = null) => {
  if (body === null) {
    return fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: 'JWT ' + accessToken,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        // console.log(json);
        return json;
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    return fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: 'JWT ' + accessToken,
      },
      body: body,
    })
      .then((response) => response.json())
      .then((json) => {
        // console.log(json);
        return json;
      })
      .catch((err) => {
        console.error(err);
      });
  }
};

export const post = (accessToken, endpoint, body = null) => {
  if (body === null) {
    return fetch(endpoint, {
      method: 'POST',
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
  } else {
    return fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: 'JWT ' + accessToken,
      },
      body: body,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        return json;
      })
      .catch((err) => {
        console.error(err);
      });
  }
};

export const patch = (accessToken, endpoint, body = null) => {
  if (body === null) {
    return fetch(endpoint, {
      method: 'PATCH',
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
  } else {
    return fetch(endpoint, {
      method: 'PATCH',
      headers: {
        Authorization: 'JWT ' + accessToken,
      },
      body: body,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        return json;
      })
      .catch((err) => {
        console.error(err);
      });
  }
};
