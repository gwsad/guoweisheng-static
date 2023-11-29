<template>
  <el-checkbox class="es-checkbox" v-model='value' :indeterminate="indeterminate" :falseLabel="falseLabel"
    :trueLabel="trueLabel" @change="change" />
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { basicProps } from "../src/props";
import { ElCheckbox } from 'element-plus/es'
const props = defineProps(basicProps)
const emit = defineEmits(['update:modelValue', 'change'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const change = (value: string) => {
  emit('change', value)
}


</script>
<style lang="scss">
.es-checkbox {
  width: 16px;
  height: 16px;
  border-radius: 2px;

  .el-checkbox__input.is-checked .el-checkbox__inner {
    background: #165DFF;
    border-color: #165DFF;
  }

  .el-checkbox__inner {
    border: 1.5px solid #D0D6E2;
  }

  .el-checkbox__inner:hover {
    border: 1.5px solid #D0D6E2;
  }
}
</style>
