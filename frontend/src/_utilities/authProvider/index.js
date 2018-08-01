
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin';

import { AUTH_SERVER } from '../config';

export default (type, params) => {
  // called when the user attempts to log in
  if (type === AUTH_LOGIN) {
    const { username, password } = params;
    const request = new Request(`http://${AUTH_SERVER.ip}:${AUTH_SERVER.port}/login`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: new Headers({ 'Content-Type': 'application/json' }),
    })

    return fetch(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }

        localStorage.setItem('username', username);
        return response.json();
      })
      .then(userdata => {
        localStorage.setItem('userid', userdata.id);
        return Promise.resolve();
      });
  }

  // called when the user clicks on the logout button
  if (type === AUTH_LOGOUT) {
    const username = localStorage.getItem('username');
    const request = new Request(`http://${AUTH_SERVER.ip}:${AUTH_SERVER.port}/logout`, {
        method: 'POST',
        body: JSON.stringify({ username }),
        headers: new Headers({ 'Content-Type': 'application/json' }),
    })

    return fetch(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.statusText);
        }

        localStorage.removeItem('username');
        localStorage.removeItem('userid');
        return Promise.resolve();
      });
  }

  // called when the API returns an error
  if (type === AUTH_ERROR) {
      const { status } = params;
      if (status === 401 || status === 403) {
          localStorage.removeItem('username');
          return Promise.reject();
      }
      return Promise.resolve();
  }

  // called when the user navigates to a new location
  if (type === AUTH_CHECK) {
      return localStorage.getItem('username') ? Promise.resolve() : Promise.reject();
  }

  return Promise.reject('Unknown method');
};
