<template>
  <el-radio-group v-model="value" class="es-radio" @change="change">
    <el-radio v-for="(item, index) in radioList" :key="index" :label="item.label" size="large">{{ item.value }}</el-radio>
  </el-radio-group>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { basicProps } from "../src/props";
import { ElRadio } from 'element-plus/es'
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
.es-radio {}
</style>
