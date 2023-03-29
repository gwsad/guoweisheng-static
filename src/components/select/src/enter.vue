<template>
  <el-select v-model="value" placeholder="请选择" :multiple="multiple" :valueKey="valueKey" :clearable="clearable">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
    </el-option>
  </el-select>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { basicProps } from "../src/props";
import { ElSelect, ElOption } from 'element-plus'
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
.es-switch {
  border-radius: 20px;

  .el-switch__core {
    border: none;
  }
}

.el-switch.is-checked.es-switch .el-switch__core {
  border: none;
}
</style>
