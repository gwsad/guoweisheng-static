import { JSEncrypt } from "encryptlong";



export function encrypt(config) {
  const _public = window.localStorage.getItem("publicKey");
  // 定义时间戳
  const timestamp = new Date().getTime();
  let params = [];

  if (config.params !== undefined || config.data !== undefined) {

    config.params !== undefined &&
      (params = [].concat(handleParams(config.params)));
    config.data !== undefined && (params = [].concat(handleParams(config.data)));
    // 去重复项
    params = [...new Set(params)];
    // 根据首字母排序
    params = params.sort((a, b) => {
      return (a + "").localeCompare(b + "");
    });
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
  if (Object.keys(params).length !== 0) {
    const res = [];
    for (const key in params) {
      if (params[key]) {
        res.push(key + "=" + params[key]);
      }
    }
    return res;
  } else {
    return [];
  }
};
