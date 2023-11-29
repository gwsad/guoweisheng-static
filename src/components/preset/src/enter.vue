<template>
  <div class="es-preset">
    <el-input class="es-preset__input" v-model="value" :placeholder="placeholder" :disabled="disabled"
      :maxlength="maxlength" :minlength="minlength" @blur="onBlur" @focus="focus" @input="input" @change="change" />
    <span class="es-preset__text" :class="{ 'es-preset__text-disabled': disabled }">{{ unit }}</span>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { basicProps } from "../src/props";
import { ElInput } from 'element-plus/es'
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
const input = (value: string) => {
  emit('input', value)
}
const change = (value: string) => {
  emit('change', value)
}


</script>
<style lang="scss">
.es-preset {
  display: flex;

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

  .es-preset__text {
    padding: 5px 16px;
    background: #F4F5F7;
    font-size: 14px;
    color: #1C232F;
  }

  .es-preset__text-disabled {
    color: #D0D6E2;

    &:hover {
      cursor: not-allowed;
    }
  }
}


.el-input.is-disabled {
  background: #F4F5F7;

  input:hover {
    background: #F4F5F7;
  }
}
</style>
