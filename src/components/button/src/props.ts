export const basicProps = {
  // 是否禁用
  disabled: { type: Boolean, default: false },
  // 是否加载中
  loading: { type: Boolean, default: false },
  // 按钮类型
  type: {
    validator(value) {
      // The value must match one of these strings
      return ['default', 'primary'].includes(value)
    }
  }

};
