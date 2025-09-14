export const inBrowser = typeof window !== 'undefined';
export const UA = inBrowser && window.navigator.userAgent.toLowerCase();
export const isAndroid = UA && UA.indexOf('android') > 0;
/* istanbul ignore next */
export const isWx = UA && !!UA.match(/MicroMessenger/i) && UA.match(/MicroMessenger/i)[0] === 'micromessenger';
/* istanbul ignore next */
export const isWxMini = isWx && !!UA.match(/miniProgram/i) && UA.match(/miniProgram/i)[0] === 'miniprogram';
export const isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
// feature
export const isDistinctAndroid = false;
export const isDistinctIOS = false;

export default {
  isAndroid,
  isWx,
  isIOS,
  isDistinctAndroid,
  isDistinctIOS,
  isWxMini
};
