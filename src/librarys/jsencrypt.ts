
// 参数加密，先过滤参数来源data或者params，然后进行md5对参数加密，生成较短的密文，最后使用公钥加密
import { md5 } from "../compression/md5.js"
import { JSEncrypt } from "../compression/jsencrypt.js"


/* 使用encrypt加密方法，在自己项目中从后端获取的publicKey存入localStorage，encrypt会从本地获取密钥进行加密 */

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
  console.log('params', _params)
  _params = (params.length === 0 ? '' : md5(_params) + '&') + `timestamp=${timestamp}`;
  const Encrypt = new JSEncrypt();
  // 创建JSEncrypt实例
  // 调用加密方法
  Encrypt.setPublicKey(_public);
  const _result = Encrypt.encrypt(_params)
  return _result;
}

// 解析传参对象
const handleParams = params => {
  if (Object.keys(params) && Object.keys(params).length !== 0) {
    const res = [];
    for (const key in params) {
      if (!params[key] && (params[key] !== 0 && params[key] !== false)) {
        console.warn('eesaComponent提示：参数' + key + '为空');
      } else {
        // 如果是字符串就删除空格 如果是对象就转成字符串
        if( typeof params[key] === 'string' ){
          res.push(`${key}=${params[key].split(' ').join('')}` || '')
        }else if( typeof params[key] === 'object' ){
          if( Array.isArray(params[key]) ){
            res.push(`${key}=[${transformArray(params[key])}]` || '')
          }else{
            res.push(`${key}=${transformArray(params[key])}` || '')
          }
        }else{
          res.push(`${key}=${params[key]}` || '')
        }
      }
    }
    return res;
  } else {
    return [];
  }
};
function transformArray(arr) {
  return arr.map(obj => {
    const keyValuePairs = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        obj[key] !== undefined && keyValuePairs.push(`${key}=${Array.isArray(obj[key]) ? '[' + transformArray(obj[key]) + ']' : obj[key] }`);
      }
    }
    return typeof obj === 'object' ? `{${keyValuePairs.join(',').split(' ').join('').replaceAll('https=','https:').replaceAll('http=','http:')}}` : obj;
  });
}

