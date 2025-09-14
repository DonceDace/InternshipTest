// 统一请求方法—— 新增
import { Toast } from 'antd-mobile-v5';
import axios from 'axios';

const serviceInstance = axios.create({
  baseURL: '',
  timeout: 1000 * 10, //请求超时时间10s
  validateStatus: status => status < 500,
  withCredentials: false, // 跨域是否需要凭证
  headers: { 'Content-Type': 'application/json', language: 'CN' } // 请求体解析类型默认json
});

// 请求拦截器
serviceInstance.interceptors.request.use(
  config => {
    // 自定义请求数据
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
/**
 * 需要忽略某个接口报错message，则ignoreError设为true；
 * status 500以及之外抛错，业务处理
 */
serviceInstance.interceptors.response.use(
  response => {
    //将响应体的data返回
    const {
      status,
      data = {},
      config: { ignoreError }
    } = response || {};
    if (status === 200) {
      if (+data?.code !== 1 && !ignoreError) {
        Toast.show(`${data.message || '服务器开小差了哦，请稍后重试~'}`);
      }
      if (+data.code === 1) {
        return data;
      }
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    const { response } = error;
    let message = '服务器开小差了哦，请稍后重试~';
    if (response && response.status) {
      if (response.status === 500) {
        Toast.show(`${response.data.message || message}`);
        return Promise.reject(error);
      } else {
        Toast.show(`${error.message || message}`);
      }
    } else {
      Toast.show(message);
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export { serviceInstance };

/**
 * 统一请求中，需要外部业务带入url全称：域名+接口地址
 */
export async function requestFn(url, options = {}) {
  if (typeof url === 'object') {
    options = url;
  }
  return serviceInstance({
    url,
    ...options
  });
}

export default requestFn;
