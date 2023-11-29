import type { PropType } from "vue";

export const basicProps = {
  // 渲染表头数据
  columns: {
    type: Array as PropType<Recordable[]>,
    default: null
  },
  // 外部传入表格数据
  sourceData: {
    type: Array as PropType<Recordable[]>,
    default: []
  },
  // 外部传入loading
  sourceLoading: {
    type: Boolean,
    default: false
  },
  // 分页总数
  listTotal: { type: Number, default: 0 },
  // 分页大小
  pageRequest: { type: Object, default: () => ({ page: 1, limit: 10 }) },
  // 折叠行数据
  rowKey: { type: String, default: "id" },

  // 是否打开选择项
  selectVisible: { type: Boolean, default: false },
  // 单行是否可选
  selectable: {
    type: Function,
    default: null
  },
  // 后端接口api地址 和请求方式  post|/api/getData
  api: { type: String, default: "" },
  // 请求头header中的content-type
  contentType: { type: String, default: "application/json" },
  // 请求参数
  reqData: { type: Object, default: () => ({}) }
};
