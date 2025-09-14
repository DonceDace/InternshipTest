import { requestBaseFn, getTemplateApi } from '@/utils/request';

// 请求枚举
const apiTemplate = {
  data_test: '/api/users/:id'
};

// demo request
export function getData(data) {
  return requestBaseFn(getTemplateApi(apiTemplate.data_test, data), {
    method: 'get'
  });
}
