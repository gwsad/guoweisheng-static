
export const basicProps = {
  // 选择器选项
  options: { type: Array, default: () => [{}] },
  // 是否禁用
  disabled: { type: Boolean, default: false },
  // 是否多选
  multiple: { type: Boolean, default: false },
  // 作为 value 唯一标识的键名，绑定值为对象类型时必填
  valueKey: { type: String, default: "value" },
  // 是否可清空
  clearable: { type: Boolean, default: false }
};
