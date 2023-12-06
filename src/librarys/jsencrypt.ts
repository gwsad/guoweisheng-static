
// 参数加密，先过滤参数来源data或者params，然后进行md5对参数加密，生成较短的密文，最后使用公钥加密
import { md5 } from "../compression/md5.js"
import { JSEncrypt } from "../compression/jsencrypt.js"
import { isArray, isObject, isString, isUndefined } from "./vueShared";
import { NOOP } from '@vue/shared'

const isIp = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;


/* 使用encrypt加密方法，在自己项目中从后端获取的publicKey存入localStorage，encrypt会从本地获取密钥进行加密 */

export function encrypt(config: any) {

  const _public = window.localStorage.getItem("publicKey");
  // 定义时间戳
  const timestamp = new Date().getTime();

  let params = [];

  // 判断是否有传参 有则进行加密
  if (!isUndefined(config.params) || !isUndefined(config.data)) {
    !isUndefined(config.params) && (params = params.concat(handleParams(config.params)));
    !isUndefined(config.data) && (params = params.concat(handleParams(config.data)));
    config.url.includes('?') && (params = params.concat(handleParams(getUrlParameters(config.url.split('?')[1]))));

    (!isUndefined(config.params) && !isUndefined(config.data)) && (params = [].concat(handleParams(config.params)).concat(handleParams(config.data)));
    // 去重复项
    params = [...new Set(params)];
    // 根据首字母排序
    params = params.sort((a, b) => {
      return (a + "").localeCompare(b + "");
    });
  } else {
    config.url.includes('?') && (params = params.concat(handleParams(getUrlParameters(config.url.split('?')[1]))));
  }
  // 拼装成字符串
  let _params = params.join("&");
  (window.location.host.includes('dev') || window.location.host.includes('test') || window.location.host.includes('localhost') || isIp.test(window.location.hostname)) && console.log('ES提示：参数', _params)

  _params = (params.length === 0 ? '' : md5(_params) + '&') + `timestamp=${timestamp}`;
  const Encrypt = new JSEncrypt();
  // 创建JSEncrypt实例
  // 调用加密方法
  Encrypt.setPublicKey(_public);
  const _result = Encrypt.encrypt(_params)
  return _result;
}

// 解析传参对象
const handleParams = (
  params: Record<string, any>
) => {
  if (Object.keys(params) && Object.keys(params).length !== 0) {
    const res = [];
    for (const key in params) {
      if (!params[key] && (params[key] !== 0 && params[key] !== false)) {
        NOOP()
      } else {
        // 如果是字符串就删除空格 如果是对象就转成字符串
        const _key = key.toUpperCase()
        if (isString(params[key])) {
          res.push(`${_key}=${params[key].split(' ').join('')}` || '')
        } else if (isObject(params[key])) {
          if (isArray(params[key])) {
            res.push(`${_key}=[${transformArray(params[key])}]` || '')
          } else {
            res.push(`${_key}=${transformArray(params[key])}` || '')
          }
        } else {
          res.push(`${_key}=${params[key]}` || '')
        }
      }
    }
    return res;
  } else {
    return [];
  }
};
// 递归拼接参数
function transformArray(arr) {
  if( isArray(arr) && arr.length > 0 ){
    return arr.map(obj => {
      const keyValuePairs = [];
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          obj[key] !== undefined && keyValuePairs.push(`${key}=${isArray(obj[key]) ? '[' + transformArray(obj[key]) + ']' : obj[key]}`);
        }
      }
      return isObject(obj) ? `{${keyValuePairs.join(',').split(' ').join('').replaceAll('https=', 'https:').replaceAll('http=', 'http:')}}` : obj;
    });
  }else{
    return '';
  }
}

// 获取url参数
function getUrlParameters(url) {
  const urlParams = new URLSearchParams(url);
  const parameters = {};
  urlParams.forEach((value, key) => {
    parameters[key] = value;
  });
  // 解码包含哈希部分的参数
  if (parameters['url']) {
    parameters['url'] = decodeURIComponent(parameters['url']);
  }
  return parameters;
}

