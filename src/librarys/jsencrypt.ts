
// 参数加密，先过滤参数来源data或者params，然后进行md5对参数加密，生成较短的密文，最后使用公钥加密
import { md5 } from "../compression/md5.js"
import { JSEncrypt } from "../compression/jsencrypt.js"

const isIp = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;


/* 使用encrypt加密方法，在自己项目中从后端获取的publicKey存入localStorage，encrypt会从本地获取密钥进行加密 */

export function encrypt(config) {

  const _public = window.localStorage.getItem("publicKey");
  // 定义时间戳
  const timestamp = new Date().getTime();

  let params = [];

  // 判断是否有传参 有则进行加密
  if (config.params !== undefined || config.data !== undefined) {
    config.params !== undefined &&
      (params = params.concat(handleParams(config.params)));
    config.data !== undefined && (params = params.concat(handleParams(config.data)));
    config.url.indexOf('?') !== -1 && (params = params.concat(handleParams(getUrlParameters(config.url.split('?')[1]))));

    (config.params !== undefined && config.data !== undefined) && (params = [].concat(handleParams(config.params)).concat(handleParams(config.data)));
    // 去重复项
    params = [...new Set(params)];
    // 根据首字母排序
    params = params.sort((a, b) => {
      return (a + "").localeCompare(b + "");
    });
  } else {
    config.url.indexOf('?') !== -1 && (params = params.concat(handleParams(getUrlParameters(config.url.split('?')[1]))));
  }
  // 拼装成字符串
  let _params = params.join("&");
  (window.location.host.indexOf('dev') !== -1 || window.location.host.indexOf('test') !== -1 || window.location.host.indexOf('localhost') !== -1 || isIp.test(window.location.hostname)) && console.log('eesaComponent提示：参数', _params)

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
        if (typeof params[key] === 'string') {
          res.push(`${key.toUpperCase()}=${params[key].split(' ').join('')}` || '')
        } else if (typeof params[key] === 'object') {
          if (Array.isArray(params[key])) {
            res.push(`${key.toUpperCase()}=[${transformArray(params[key])}]` || '')
          } else {
            res.push(`${key.toUpperCase()}=${transformArray(params[key])}` || '')
          }
        } else {
          res.push(`${key.toUpperCase()}=${params[key]}` || '')
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
  if( arr instanceof Array && arr.length > 0 ){
    return arr.map(obj => {
      const keyValuePairs = [];
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          obj[key] !== undefined && keyValuePairs.push(`${key}=${Array.isArray(obj[key]) ? '[' + transformArray(obj[key]) + ']' : obj[key]}`);
        }
      }
      return typeof obj === 'object' ? `{${keyValuePairs.join(',').split(' ').join('').replaceAll('https=', 'https:').replaceAll('http=', 'http:')}}` : obj;
    });
  }else{
    return '';
  }
}
// // 自定义比较函数，根据首字母进行排序
function sortByFirstLetter(a, b) {
  const firstLetterA = a[0].toLowerCase(); // 获取第一个字符并转为小写
  const firstLetterB = b[0].toLowerCase(); // 获取第一个字符并转为小写

  if (firstLetterA < firstLetterB) {
    return -1;
  } else if (firstLetterA > firstLetterB) {
    return 1;
  } else {
    return 0;
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
  console.log('12312312',parameters)
  return parameters;
}

