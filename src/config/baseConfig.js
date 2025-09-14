export const hostConfig = {
  production: 'https://test.com',
};

export const define = {
  SERVER_ENV: SERVER_ENV
};

export const baseUrl = hostConfig[define.SERVER_ENV];

export default {
  baseUrl: hostConfig[define.SERVER_ENV]
};
