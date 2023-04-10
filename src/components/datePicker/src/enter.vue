<template>
  <el-date-picker class="es-picker" v-model="modelValue" :type="type" :placeholder="placeholder" :readonly="readonly"
    :disabled="disabled" :clearable="clearable" :startPlaceholder="startPlaceholder" :endPlaceholder="endPlaceholder" />
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { basicProps } from "../src/props";
import { ElCheckbox } from 'element-plus'
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
.el-date-table td.current:not(.disabled) .el-date-table-cell__text {
  background-color: #165DFF !important;
}
</style>
