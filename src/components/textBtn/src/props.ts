export const basicProps = {
  // 按钮文本
  text: { type: String, default: '' },
  // 是否禁用
  disabled: { type: Boolean, default: false },
  // 按钮类型
  type: {
    validator(value) {
      // The value must match one of these strings
      return ['default', 'primary', 'danger'].includes(value)
    }
  }

};
