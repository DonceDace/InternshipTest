import { baseUrl } from '../config/baseConfig';
import axios from 'axios';

const axiosInstance = axios.create({
  timeout: 30 * 1000,
  withCredentials: true,
  baseURL: '',
  validateStatus: status => status < 500
});

axiosInstance.interceptors.request.use(
  request => {
    return request;
  },
  error => {
    /* istanbul ignore next */
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return response.data;
    }

    return response.data;
  },
  error => {
    const { response } = error;
    if (response.status === 500) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };

export function getUrl(path) {
  if (path.startsWith('http')) {
    return path;
  }
  return `${baseUrl}${path.startsWith('/') ? path : '/' + path}`;
}

export function getTemplateApi(apiTemplate, templateParams = {}, addStr = '') {
  const arr = apiTemplate.split('/');
  const newApi = arr
    .reduce((arr, item) => {
      if (item.indexOf(':') === 0 && templateParams[item.substring(1)] != null) {
        item = templateParams[item.substring(1)];
      }
      arr.push(item);
      return arr;
    }, [])
    .join('/');

  return newApi + addStr;
}

export async function requestBaseFn(url, options = {}) {
  if (typeof url === 'string') {
    url = getUrl(url);
  }

  if (typeof url === 'object') {
    options = url;
  }

  if (options.url) {
    options.url = getUrl(options.url);
  }

  return axiosInstance({
    url,
    ...options
  });
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "axios"
 * @return {object}           An object containing either "data" or "err"
 */
export default requestBaseFn;
