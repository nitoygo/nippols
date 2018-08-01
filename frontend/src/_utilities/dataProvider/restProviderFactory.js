import { fetchUtils } from 'react-admin';

import { API_SERVER } from '../config';

import restProvider from './restProvider';

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }

  const xuser = localStorage.getItem('username');
  options.headers.set('X-User', xuser);
  return fetchUtils.fetchJson(url, options);
}

const restDataProvider = restProvider(`http://${API_SERVER.ip}:${API_SERVER.port}`, httpClient);
export default (type, resource, params) =>
  new Promise(resolve =>
      setTimeout(() => resolve(restDataProvider(type, resource, params)), 500)
  );
