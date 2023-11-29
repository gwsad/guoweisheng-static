<template>
  <div class="containerTab">
    <el-table
      :data="tableData.record"
      :row-key="rowKey"
      class="rounded containerTab__table"
      v-loading="isLoading"
      highlight-current-row
      :header-cell-style="{ background: ' #F3F5F8', width: '600px' }"
      @selection-change="selectionChange"
    >
      <el-table-column
        v-if="selectVisible"
        type="selection"
        width="45"
        align="center"
      />
      <template v-for="(column, index) in columns" :key="index">
        <el-table-column
          v-if="column.slots"
          :key="column.prop"
          v-bind="setAttrs(column)"
          :fixed="column.fixed"
          :width="column.width"
        >
          <template #default="scope">
            <Render
              :customData="column.slots"
              :row="scope.row"
              :class="column.class"
              :index="scope.$index"
            />
          </template>
        </el-table-column>
        <template v-else>
          <el-table-column :key="column.prop" v-bind="setAttrs(column)" />
        </template>
      </template>
    </el-table>
    <!-- 分页 -->
    <div class="pagination-box">
      <el-pagination
        :current-page="pageOpt.page"
        :page-size="pageOpt.limit"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, prev, pager, next, sizes"
        :total="pageOpt.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  watch,
  watchEffect,
  ref,
  provide,
  reactive
} from "vue";
import { message } from "@/utils/message";
import { http } from "@/utils/http";
import Render from "./src/render";
import { basicProps } from "./src/props";
export default defineComponent({
  name: "SrmTable",
  props: basicProps,
  components: { Render },
  setup(props, ctx) {
    // 表格内部注入数据
    const tableData: any = reactive({ record: [] });
    // 表格请求参数
    const pageOpt: any = ref({ page: 1, limit: 10, total: 100 });
    // 是否加载中
    const isLoading = ref(false);

    watchEffect(() => {
      // loading状态发生改变
      isLoading.value = props.sourceLoading;
    });
    watch(
      () => props.sourceData || [],
      val => {
        // 外部传入数据改变
        if (!props.api) {
          tableData.record = val;
          Object.assign(pageOpt.value, props.pageRequest, {
            total: props.listTotal
          });
        } else {
          initData();
          pageOpt.value = { page: 1, limit: 10 };
        }
      },
      { immediate: true }
    );
    // 外部传入请求参数
    watch(
      () => props.reqData,
      () => {
        pageOpt.value = { page: 1, limit: 10 };
        initData();
      },
      { deep: true }
    );
    function setAttrs(params) {
      const { ...options } = params;
      if (!options.align) {
        options.align = "center";
      }
      if (options.sortable && options.sortOrders) {
        options["sort-orders"] = options.sortOrders;
      }
      return { ...options };
    }

    // 每页数量改变
    function handleSizeChange(val) {
      if (val === pageOpt.value.limit) return;
      pageOpt.value.limit = val;
      !props.api ? ctx.emit("currentChange", pageOpt.value) : initData();
    }
    // 当前页改变
    function handleCurrentChange(val) {
      if (val === pageOpt.value.page) return;
      pageOpt.value.page = val;
      !props.api ? ctx.emit("currentChange", pageOpt.value) : initData();
    }
    // 组件内部初始化数据
    async function initData() {
      if (props.sourceData.length > 0 || !props.api) {
        return;
      }
      const reqOpt = props.api.split("|");
      const [method, url] = reqOpt[1] ? reqOpt : ["get", reqOpt[0]];
      const reqKey = method.toLowerCase() === "post" ? "data" : "params";
      isLoading.value = true;
      try {
        const res = await http[method](url[0] === "/" ? url : "/" + url, {
          [reqKey]: {
            ...props.reqData,
            ...{ page: pageOpt.value.page, limit: pageOpt.value.limit }
          }
        });
        if (res.resp_code === 0) {
          tableData.record = res.datas.records ? res.datas.records : res.datas;
          pageOpt.value.total = res.datas.total || 0;
          isLoading.value = false;
        } else {
          isLoading.value = false;
        }
      } catch (error) {
        isLoading.value = false;
        message(error, { type: "error" });
      }
    }
    const selectionChange = data => {
      if (!props.selectVisible) return;
      ctx.emit("selectionChange", data);
    };
    // 触发事件注入
    provide("vm", ctx);
    return {
      selectionChange,
      handleSizeChange,
      setAttrs,
      initData,
      handleCurrentChange,
      tableData,
      pageOpt,
      isLoading
    };
  }
});
</script>
<style lang="scss">
.containerTab {
  width: 100%;
  box-sizing: border-box;

  .containerTab__table {
    width: 100%;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
  }

  .pagination-box {
    width: 100%;
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
