<template>
  <button class="es-button"
    :class="{ 'es-button_default': type === 'default', 'es-button_primary': type === 'primary', 'es-button_default_disabled': disabled && type === 'default' }"
    :disabled="disabled" :loading="loading" :type="type" @click="onClick">
    <slot></slot>
  </button>
</template>
<script lang="ts" setup>
import { basicProps } from "../src/props";
const emit = defineEmits(['click'])
const props = defineProps(basicProps)

const onClick = () => {
  !props.disabled && emit('click')
}

</script>
<style lang="scss">
.es-button {
  padding: 5px 26px;
  font-weight: 400;
  font-size: 14px;
  border-radius: 4px;
}

.es-button.es-button_default {
  color: #919DB5;
  border: none;
  background: #F3F4F7;

  span {
    color: #919DB5;
  }

  &:hover {
    border: none;
    background: #E7E8EF;
  }

  &:active {
    border: none;
    background: #CED4DE;
  }
}

.es-button_default_disabled {
  background: #EEEFF3 !important;

  span {
    color: #C8CEDA !important;
  }

  &:hover {
    cursor: not-allowed;
  }
}

.es-button.es-button_primary {
  color: #FFFFFF;
  border: none;
  background: #165DFF;

  span {
    color: #FFFFFF;
  }

  &:hover {
    border: none;
    background: #4080FF;
  }

  &:active {
    border: none;
    background: #0E42D2;
  }

}
</style>
