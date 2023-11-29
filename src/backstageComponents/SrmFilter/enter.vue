<template>
  <el-row class="search-form">
    <el-form ref="form" :inline="true" v-bind="$attr">
      <el-form-item
        :label="item.showLabel && item.name"
        v-for="(item, index) of items"
        :key="index"
      >
        <!-- 输入框 -->
        <el-input
          v-if="!item.type || item.type === 'input'"
          v-model.trim="searchParamsFilter[item.key]"
          :disabled="item.disabled"
          v-bind="setAttrs(item)"
          :maxlength="item.maxLen || 500"
          :placeholder="item.placeholder || `请输入${item.name}`"
          style="width: 200px"
        />
        <!-- 数字输入框 -->
        <el-input-number
          v-else-if="item.type === 'number'"
          v-model.trim="searchParamsFilter[item.key]"
          :disabled="item.disabled"
          v-bind="setAttrs(item)"
          :controls="false"
          :placeholder="item.placeholder || `请输入${item.name}`"
        />
        <!-- 单选框 -->
        <el-select
          v-else-if="item.type === 'select'"
          v-model="searchParamsFilter[item.key]"
          v-bind="setAttrs(item)"
          allow-clear
          :multiple="item.multiple || false"
          :placeholder="item.placeholder || `请选择${item.name}`"
          @change="
            value => {
              $emit('selectChange', { value, item });
            }
          "
        >
          <el-option
            v-for="(option, i) of item.options || selectOptions"
            :key="i"
            :value="
              option[(item['props'] && item['props']['value']) || 'value']
            "
            :label="
              option[(item['props'] && item['props']['label']) || 'label']
            "
          />
        </el-select>
        <!-- 日期选择 -->
        <el-date-picker
          v-else-if="item.type === 'date'"
          v-model="searchParamsFilter[item.key]"
          type="date"
          :placeholder="item.placeholder || '请选择日期'"
          v-bind="setAttrs(item)"
        />
        <!-- 月份选择 -->
        <el-date-picker
          v-else-if="item.type === 'monthrange'"
          v-model="searchParamsFilter[item.key]"
          type="monthrange"
          v-bind="setAttrs(item)"
          range-separator="-"
          :start-placeholder="item.startPlaceholder || '开始月份'"
          :end-placeholder="item.endPlaceholder || '结束月份'"
        />
        <!-- 日期范围选择 -->
        <el-date-picker
          v-else-if="item.type === 'daterange'"
          v-model="searchParamsFilter[item.key]"
          type="daterange"
          range-separator="-"
          :start-placeholder="item.startPlaceholder || '开始日期'"
          :end-placeholder="item.endPlaceholder || '结束日期'"
          :value-format="item.valueFormat || 'YYYY-MM-DD HH:mm:ss'"
          v-bind="setAttrs(item)"
        />
      </el-form-item>
    </el-form>
    <div class="button-group">
      <el-form-item class="button">
        <!-- button 前置插槽 -->
        <slot name="prefix-button" />
        <el-button type="primary" native-type="submit" @click="handleSearch"
          >查 询</el-button
        >
        <el-button @click="handleReset">重 置</el-button>
        <!-- button 后置插槽 -->
        <slot name="suffix-button" />
      </el-form-item>
    </div>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, watch } from "vue";
import { filterProps } from "./src/props";
export default defineComponent({
  name: "SrmFilter",
  props: filterProps,
  setup(props, ctx) {
    const selectOptions = reactive([]); // 选择框的选项
    const initSearchParams = reactive({}); // 初始化的查询参数
    const searchParamsFilter = reactive({}); // 查询参数

    // 绑定属性 继承element相关组件的全部属性
    function setAttrs(params) {
      // eslint-disable-next-line
      const { ...options } = params;
      return { ...options };
    }

    // 查询按钮
    function handleSearch() {
      const cpValue = JSON.parse(JSON.stringify(searchParamsFilter));
      ctx.emit("search", cpValue);
    }
    // 重置按钮
    function handleReset() {
      Object.assign(searchParamsFilter, initSearchParams);
      const cpValue = JSON.parse(JSON.stringify(initSearchParams));
      ctx.emit("reset", cpValue);
    }

    // 设置选择框的选项
    async function setSelectOptions(data) {
      const arr = data.filter(item => item.type === "select");
      let reqFunc = null;
      // eslint-disable-next-line no-unused-vars
      if (arr && arr.length > 0) {
        reqFunc = arr[0].reqFunc;
        if (!reqFunc) return;
        const res = await reqFunc();
        this.selectOptions = res.data;
      }
    }

    // 初始化搜索内容
    function init() {
      Object.assign(
        searchParamsFilter,
        JSON.parse(JSON.stringify(props.searchParams))
      );
      if (Object.keys(initSearchParams).length === 0) {
        Object.assign(
          initSearchParams,
          JSON.parse(JSON.stringify(props.searchParams))
        );
      }

      setSelectOptions(props.items);
    }
    watch(
      () => props.searchParams,
      () => {
        init();
      },
      { deep: true }
    );
    onBeforeMount(() => {
      init();
    });
    return {
      selectOptions,
      searchParamsFilter,
      setAttrs,
      handleSearch,
      handleReset,
      init
    };
  }
});
</script>

<style lang="scss">
.search-form {
  .el-form {
    display: flex;
    flex-wrap: wrap;
  }

  ::v-deep .el-form-item {
    margin-bottom: 20px;
    margin-right: 10px;
    display: flex;

    .el-form-item__label {
      padding: 0 !important;
      margin-right: 10px;
    }

    .el-form-item__content {
      flex: 1;
    }
  }

  ::v-deep .el-input__inner {
    height: 32px;
  }

  ::v-deep .el-input,
  .el-cascader,
  .el-select,
  .el-date-editor {
    width: 100%;
  }

  ::v-deep.section-input {
    width: calc((100% - 20px) / 2);
  }

  .symbol {
    display: inline-block;
    text-align: center;
    width: 20px;
  }

  .button-group {
    vertical-align: top;
    float: left;
    margin-left: 40px;
  }

  .extra-button-container {
    .extra-button-right {
      .extra-button-container {
        .extra-button-right {
          float: right;
        }
      }
    }
  }

  .el-input__wrapper {
    min-width: 150px;
  }
}
</style>
