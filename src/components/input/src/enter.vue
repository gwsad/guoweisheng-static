<template>
  <el-input class="es-input" :class="{ 'clear-padding': clearable }" v-model="value" :type="type"
    :placeholder="placeholder" :disabled="disabled" :maxlength="maxlength" :minlength="minlength" :clearable="clearable"
    :showWordLimit="showWordLimit" :show-password="showPassword" :rows="rows" :autosize="autosize" @blur="onBlur"
    @focus="focus" @clear="clear" @input="input" @change="change" />
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { basicProps } from "../src/props";
import { ElInput } from 'element-plus'
const props = defineProps(basicProps)
const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'clear', 'input', 'change'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const onBlur = () => {
  emit('blur')
}
const focus = () => {
  emit('focus')
}
const clear = () => {
  emit('clear')
}
const input = (value: string) => {
  emit('input', value)
}
const change = (value: string) => {
  emit('change', value)
}


</script>
<style lang="scss">
.es-input {
  .el-input__wrapper {
    padding: 0;

    input {
      height: 32px;
      padding: 5px 16px;
      font-weight: 400;
      font-size: 14px;
      color: #1C232F;
      border: 1px solid transparent;
      background: #F4F5F7;
      border-radius: 4px;
      cursor: text;
    }

    input:hover {
      background: #E5E6EC;
    }

    input:focus {
      background: #FFFFFF;
      border: 1px solid #165DFF;
    }
  }



  .el-input__wrapper:hover {
    box-shadow: none;
  }

  .el-input__wrapper.is-focus {
    box-shadow: none;
  }

  .el-input__suffix {
    position: absolute;
    right: 10px;
  }

}

.clear-padding {
  .el-input__wrapper {
    .el-input__inner {
      padding-right: 25px;
    }
  }
}

.el-input--large .el-input__wrapper {
  padding: 0 !important;
}

.el-form-item.is-error .el-input__wrapper {
  box-shadow: none !important;
}

.el-input.is-disabled {
  background: #F4F5F7;

  input:hover {
    background: #F4F5F7;
  }
}
</style>
