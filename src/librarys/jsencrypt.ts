import { JSEncrypt } from "encryptlong";

/* 使用encryptlong加密方法，在自己项目中从后端获取的publicKey存入localStorage，encrypt会从本地获取密钥进行加密 */

export function encrypt(config) {
  const _public = window.localStorage.getItem("publicKey");
  // 定义时间戳
  const timestamp = new Date().getTime();

  let params = [];

  // 判断是否有传参 有则进行加密
  if (config.params !== undefined || config.data !== undefined) {
    if (config.url.indexOf('?') !== -1) {
      config.url.split('?')[1].split('&').forEach(item => {
        params.push(item)
      })
    }
    config.params !== undefined &&
      (params = params.concat(handleParams(config.params)));
    config.data !== undefined && (params = params.concat(handleParams(config.data)));

    (config.params !== undefined && config.data !== undefined) && (params = [].concat(handleParams(config.params)).concat(handleParams(config.data)));
    // 去重复项
    params = [...new Set(params)];
    // 根据首字母排序
    params = params.sort((a, b) => {
      return (a + "").localeCompare(b + "");
    });
  } else {
    config.url.indexOf('?') !== -1 && (params = config.url.split('?')[1].split('&'))
  }
  // 拼装成字符串
  let _params = params.join("&");
  _params = _params + (params.length === 0 ? '' : '&') + `timestamp=${timestamp}`;
  // 创建JSEncrypt实例
  const encrypt = new JSEncrypt();
  // 调用加密方法
  encrypt.setPublicKey(_public);

  const _result =
    _params.length > 100
      ? encrypt.encryptLong(_params)
      : encrypt.encrypt(_params);
  return _result;
}

// 解析传参对象
const handleParams = params => {
  if (Object.keys(params) && Object.keys(params).length !== 0) {
    const res = [];
    for (const key in params) {
      if (!params[key] && (params[key] !== 0 || params[key] !== false)) {
        console.error('参数为空')
      } else {
        res.push(key + "=" + (typeof params[key] === 'object' ? JSON.stringify(params[key]).toString().split('"').join('').split(':').join('=') : params[key]) || '')
      }
    }
    return res;
  } else {
    return [];
  }
};
