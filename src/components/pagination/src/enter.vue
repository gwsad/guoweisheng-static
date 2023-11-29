<template>
  <div class="es-pagination">
    <span>共 {{ total }} 项数据</span>
    <el-pagination background :page-size="pageSize" layout="sizes,prev, pager, next"
      :hide-on-single-page="hideOnSinglePage" :disabled="disabled" :total="total" @size-change="sizeChange"
      @current-change="currentChange" @prev-click="prevClick" @next-click="nextClick" />
  </div>
</template>
<script lang="ts" setup>
import { basicProps } from "../src/props";
import { ElPagination } from 'element-plus/es'
const props = defineProps(basicProps)
const emit = defineEmits(['sizeChange', 'currentChange', 'prevClick', 'nextClick'])

const sizeChange = () => {
  emit('sizeChange')
}

const currentChange = () => {
  emit('currentChange')
}

const prevClick = () => {
  emit('prevClick')
}

const nextClick = () => {
  emit('nextClick')
}

</script>
<style lang="scss">
.es-pagination {
  display: flex;
  align-items: center;
  background: #fff;
  font-size: 14px;
  padding: 1px 0 1px 16px;

  .el-select {}

  span {
    font-weight: 400;
    color: #919DB5;
    margin-right: 16px;
  }

  .el-input__wrapper {
    padding: 1px 0;
    box-shadow: none;
    background: #F4F5F7;
    border-radius: 4px;

    &:hover {
      box-shadow: none;
    }
  }

  .el-select .el-input.is-focus .el-input__wrapper {
    box-shadow: none;
  }

  .el-select .el-input.is-focus .el-input__wrapper {
    box-shadow: none !important;
  }

  .es-pagination span {
    margin-right: 10px;
  }

  .el-input__suffix {
    margin-right: 8px;
  }

  .el-input__suffix-inner {
    margin-right: 0;
  }

  .el-pagination.is-background .btn-prev {
    margin-left: 0;
  }

  .el-pagination.is-background .btn-next.is-active,
  .el-pagination.is-background .btn-prev.is-active,
  .el-pagination.is-background .el-pager li.is-active {
    width: 30px;
    height: 30px;
    background: #165DFF;
    border-radius: 2px;
    color: #FFFFFF;
  }

  .el-pagination.is-background .btn-next,
  .el-pagination.is-background .btn-prev,
  .el-pagination.is-background .el-pager li {
    width: 30px;
    height: 30px;
    background: #F4F5F7;
    border-radius: 2px;
  }

  .el-pagination .btn-next .el-icon,
  .el-pagination .btn-prev .el-icon {
    font-size: 16px;
  }

  svg {
    display: inline-block;
  }
}
</style>
