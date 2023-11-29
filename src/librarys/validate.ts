/**
 * @param {string} text
 * @return {boolean}
 */
const isMobile = (text: string): boolean => {
  const pattern = /^1[3-9]\d{9}$/
  return pattern.test(text)
}
const isMessageCode = (text: string): boolean => {
  const pattern = /^[0-9]{6}$/
  return pattern.test(text)
}
const isEmail = (text: string): boolean => {
  const pattern = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
  return pattern.test(text)
}

const isIp = (text: any): boolean => {
  const pattern = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;
  return pattern.test(text)
}

/**
 * 验证银行卡
 * @param {string} text 银行卡
 * @return {boolean}
 */
const isBankCard = (text: string): boolean => {
  const pattern = /^\d{16,19}$/
  return pattern.test(text)
}
/**
 * 验证是否为身份证号码
 * @param {string} card 身份证号码
 * @return {boolean}
 */
const isIdCard = (text: string): boolean => {
  //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
  const pattern = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/
  return pattern.test(text)
}

export default {
  isMobile,
  isMessageCode,
  isEmail,
  isBankCard,
  isIdCard,
  isIp
}
