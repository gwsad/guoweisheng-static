import { h } from "vue";
export default {
  props: {
    customData: {
      type: Array,
      default: () => []
    },
    row: {
      type: Object,
      default: () => ({})
    },
    index: {
      type: Number,
      default: 0
    }
  },
  inject: ["vm"],
  render() {
    const { customData, row, index, vm } = this;
    return h("div", {}, [
      ...customData.map(c => c.render.apply(this, [h, vm, row, index]))
    ]);
  }
};
