import type { PropType } from "vue";

export const filterProps = {
  // 表单宽度
  labelWidth: { type: Number, default: 100 },
  // 表单配置
  items: {
    type: Array as PropType<Recordable[]>,
    default: () => []
  },
  // 表单参数
  searchParams: { type: Object, default: () => ({}) },

  // 是否打开选择项
  selectVisible: { type: Boolean, default: false },
  // 单行是否可选
  selectable: {
    type: Function,
    default: null
  },
  // 后端接口api地址 和请求方式  post|/api/getData
  api: { type: String, default: "" },
  // 后端接口api地址 和请求方式  post|/api/getData
  contentType: { type: String, default: "application/json" }
  // 请求参数
};
