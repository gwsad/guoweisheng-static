<template>
  <el-switch class="es-switch" v-model="value" :disabled="disabled" :loading="loading" :activeText="activeText"
    :activeValue="activeValue" :inactiveText="inactiveText" :inactiveValue="inactiveValue" :active-color="activeColor"
    :inactive-color="inactiveColor" :inline-prompt="inlinePrompt" @change="change" />
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { basicProps } from "../src/props";
import { ElSwitch } from 'element-plus/es'
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
