import * as env from '@/config/env';

describe('utils env', () => {
  it('should env right', function () {
    expect(env.isAndroid).not.toBeTruthy();
    expect(env.isWx).not.toBeTruthy();
    expect(env.isWxMini).not.toBeTruthy();
    expect(env.isIOS).not.toBeTruthy();
  });
});
