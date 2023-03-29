
export const basicProps = {
  // 是否禁用
  disabled: { type: Boolean, default: false },
  // 是否加载中
  loading: { type: Boolean, default: false },
  // 输入框内容
  modelValue: { type: Boolean, default: false },
  // switch 打开时的文字描述
  activeText: { type: String, default: "" },
  // switch 打开时的值
  activeValue: { type: [Boolean, String, Number], default: true },
  // switch 关闭时的文字描述
  inactiveText: { type: String, default: "" },
  // switch 关闭时的值
  inactiveValue: { type: [Boolean, String, Number], default: false },
  // switch 打开时的背景色
  activeColor: { type: String, default: "#00B42A" },
  // switch 关闭时的背景色
  inactiveColor: { type: String, default: "#D0D6E2" },
  // 文字显示在开关里面
  inlinePrompt: { type: Boolean, default: false },

};
