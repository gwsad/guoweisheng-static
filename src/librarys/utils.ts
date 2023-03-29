
interface CallbackFn {
  <T>(data: T): void;
}

const ua = navigator.userAgent

function prefixZero(val: string | number): string {
  if (val < 10) {
    return "0" + val
  } else {
    return "" + val
  }
}

function toFixed(val: number, length: number): string {
  let posNum = 0
  const value = val + ''
  const posIndex = value.indexOf('.')
  const precision = value.substr(posIndex + length + 1, 1)
  if (precision == '') {
    return value + '0'.repeat(length - value.substr(posIndex + 1).length)
  } else if (Number(precision) >= 5) {
    posNum = 1
  }
  const powNum = Math.pow(10, length)
  const result = Math.floor(val * powNum) + posNum
  return '' + result / powNum
}
function weixin(): boolean {
  return ua.indexOf('MicroMessenger') > -1
}
function ios(): boolean {
  return ua && /iPhone|iPad|iPod/gi.test(ua)
}
function android(): boolean {
  return ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1
}

function getAndroidV() {
  const uaVal = ua.toLowerCase()
  let version = null
  if (uaVal.indexOf('android') > 0) {
    const reg = /android [\d._]+/gi
    const info = uaVal.match(reg)
    version = (info + '').replace(/[^0-9|_.]/gi, '').replace(/_/gi, '.') // 得到版本号4.2.2
    version = parseInt(version.split('.')[0]) // 得到版本号第一位
  }

  return version
}
function isApp(): boolean {
  const app_useragent = /Eesa/
  if (ua.match(app_useragent)) {
    return true
  }
  return false
}

/**
 * @param fn {Function}   实际要执行的函数
 * @param wait {Number}  执行间隔，单位是毫秒（ms）
 * @return {Function}     返回一个“节流”函数
 */
function throttle(func: CallbackFn, wait): CallbackFn {
  let lastTime = null
  let timeout = null
  return function () {
    const context = this
    const now = new Date().getTime()
    // 如果上次执行的时间和这次触发的时间大于一个执行周期，则执行
    if (now - lastTime - wait > 0) {
      // 如果之前有了定时任务则清除
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      func.apply(context, arguments)
      lastTime = now
    } else if (!timeout) {
      timeout = setTimeout(() => {
        func.apply(context, arguments)
      }, wait)
    }
  }
}
/**
 * @param {Function} fn   实际要执行的函数
 * @param { Number } wait  执行间隔，单位是毫秒（ms）
 * @return {Function}     返回一个“防抖”函数
 */
function debounce(func: CallbackFn, wait: number): CallbackFn {
  let lastTime = null
  let timeout = null
  return function () {
    const context = this
    const now = new Date().getTime()
    // 判定不是一次抖动
    if (now - lastTime - wait > 0) {
      timeout = setTimeout(() => {
        func.apply(context, arguments)
      }, wait)
    } else {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      timeout = setTimeout(() => {
        func.apply(context, arguments)
      }, wait)
    }
    // 注意这里lastTime是上次的触发时间
    lastTime = now
  }
}
/**
 * @param {Object} obj
 * @returns {string} result
 */
function queryStringify(obj: any): string {

  function toQueryPair(key, value) {
    if (value === '') {
      return key;
    }
    return key + '=' + encodeURIComponent(value === '' ? '' : String(value))
  }

  let result = []
  Object.keys(obj).forEach((key) => {
    key = encodeURIComponent(key)
    const values = obj[key]
    if (values && values.constructor == Array) {

      const queryValues = []
      for (let i = 0, len = values.length; i < len; i++) {
        queryValues.push(toQueryPair(key, values[i]))
      }
      result = result.concat(queryValues)

    } else {
      result.push(toQueryPair(key, values))
    }
  })

  return result.join('&')
}

/**
 * @param {String || null } val
 * @return {Object |  String} result
 */
function getQueryParams(val: string): string {
  const searchParams = new URLSearchParams(location.search)
  const result = Object.create(null)
  searchParams.forEach((value, key) => {
    result[key] = value
  })
  if (val) {
    return result[val]
  } else {
    return result
  }
}
function getPassiveValue(): any {
  let supportsPassiveOption = false
  try {
    addEventListener("test", null, Object.defineProperty({}, 'passive', {
      get: function () {
        supportsPassiveOption = true
      }
    }));
  } catch (e) { }
  //{passive: true} 就不会调用 preventDefault 来阻止默认滑动行为
  return supportsPassiveOption ? { passive: true, capture: true } : true
}
function trim(text): string {
  if (text) {
    return text.replace(/\s+/g, "")
  } else {
    return ''
  }
}
function getUniqueId(randomLength: number = 10): string {
  let idStr = Date.now().toString(36)
  idStr += Math.random().toString(36).substr(3, randomLength)
  return idStr
}
function getFontSize() {
  return parseFloat(document.documentElement.style.fontSize)
}
/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const isSafariBrowser = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    if (isSafariBrowser) {
      // 兼容safari浏览器
      date = new Date(time.split('.')[0])
    } else {
      date = new Date(time)
    }
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export {
  prefixZero,
  toFixed,
  weixin,
  isApp,
  ios,
  android,
  parseTime,
  getFontSize,
  getAndroidV,
  getPassiveValue,
  trim,
  getQueryParams,
  getUniqueId,
  queryStringify,
  throttle,
  debounce
}
