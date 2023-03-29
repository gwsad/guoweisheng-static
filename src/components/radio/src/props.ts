export const basicProps = {
  // 是否禁用
  disabled: { type: Boolean, default: false },
  // 按钮信息
  radioList: { type: Array, default: () => [] },
  // 多选框的值
  modelValue: { type: [Boolean, String, Number], default: true },
  // 选中时的值
  trueLabel: { type: [String, Number], default: null },
  // 没有选中时的值
  falseLabel: { type: [String, Number], default: null }
};
