import type { PropType } from "vue";

export const basicProps = {
  // 日历值
  modelValue: { type: [Boolean, String, Number], default: true },
  // 日期格式
  type: { type: String, default: "date" },
  // 暗文内容
  placeholder: { type: String, default: "请选择" },
  // 是否只读
  readonly: { type: Boolean, default: false },
  // 是否禁用
  disabled: { type: Boolean, default: false },
  // 是否显示清除按钮
  clearable: { type: Boolean, default: false },
  // 范围选择时开始日期的占位内容
  startPlaceholder: { type: String, default: "开始日期" },
  // 范围选择时结束日期的占位内容
  endPlaceholder: { type: String, default: "结束日期" },
};
