import type { PropType } from "vue";

export const basicProps = {
  // 输入类型
  type: { type: String, default: "text" },
  // 输入框内容
  modelValue: { type: String, default: "" },
  // 暗文内容
  placeholder: { type: String, default: "请输入" },
  // 是否禁用
  disabled: { type: Boolean, default: false },
  // 输入长度限制
  maxlength: { type: Number, default: 100 },
  // 输入最小长度限制
  minlength: { type: Number, default: 0 },
  // 是否清除
  clearable: { type: Boolean, default: false },
  // 是否统计字数
  showWordLimit: { type: Boolean, default: false },
  // 是否显示密码切换
  showPassword: { type: Boolean, default: false },
  // 输入框行数
  rows: { type: Number, default: 4 },
  // 高度自适应
  autosize: { type: Object, default: () => ({ minRows: 2, maxRows: 6 }) }
};
