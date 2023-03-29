import type { PropType } from "vue";
export const basicProps = {
  // 分页总数
  total: { type: Number, default: 100 },
  // 页码
  pageSize: {
    type: Array,
    default: [10, 20, 50, 100, 200, 500, 1000],
  },
  // 只有一页是否隐藏
  hideOnSinglePage: { type: Boolean, default: false },
  // 是否禁用
  disabled: { type: Boolean, default: false }

};
