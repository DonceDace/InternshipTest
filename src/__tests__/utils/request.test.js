import request, { getTemplateApi, axiosInstance } from '@/utils/request';
import MockAdapter from 'axios-mock-adapter';
const mock = new MockAdapter(axiosInstance);

beforeEach(() => {
  mock.onGet(/\/test\/a/).reply(200, {
    test: 'a'
  });
  mock.onGet(/\/test\/b/).reply(500, {
    test: 'b'
  });
  mock.onGet(/\/test\/c/).reply(204, {
    test: 'c'
  });
  mock.onGet(/\/test\/d/).reply(502, {
    test: 'd'
  });
});

describe('utils request', () => {
  it('pass getTemplateApi function', async () => {
    const urls = ['api/:id', 'api/:id/:id1', 'api/:id1/:id1', 'api/id/:id', 'api/id/:id1'];
    const params = {
      id: 1,
      id1: 2
    };
    const testResult = urls.map(url => getTemplateApi(url, params));

    expect(testResult).toEqual(['api/1', 'api/1/2', 'api/2/2', 'api/id/1', 'api/id/2']);
    expect(getTemplateApi('/:id')).toEqual('/:id');
  });

  it('pass local request', async () => {
    const data = await request('test/a', { method: 'get' });
    expect(data).toEqual({ test: 'a' });
  });

  it('pass on response error', async () => {
    try {
      await request({
        url: '/test/b'
      });
    } catch (e) {
      expect(e.response.status).toBe(500);
    }
  });

  it('pass on response 204', async () => {
    const data = await request('http:mock.cn/test/c', { method: 'get' });
    expect(data).toEqual({ test: 'c' });
  });

  it('pass on response 502', async () => {
    try {
      await request({
        url: '/test/d'
      });
    } catch (e) {
      expect(e.response.status).toBe(502);
    }
  });
});
