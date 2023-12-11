<template>
  <component
    is="button"
    ref="_ref"
    v-bind="_props"
    :class="[
      ns.b(),
      ns.m(_type),
      ns.m(_size),
      ns.is('disabled', _disabled),
      ns.is('loading', loading),
      ns.is('plain', plain),
      ns.is('round', round),
      ns.is('circle', circle),
      ns.is('text', text),
      ns.is('link', link),
      ns.is('has-bg', bg),
    ]"
    :style="buttonStyle"
    @click="handleClick"
  >
    <template v-if="loading">
      <slot v-if="$slots.loading" name="loading" />
      <el-icon v-else :class="ns.is('loading')">
        <component :is="loadingIcon" />
      </el-icon>
    </template>
    <el-icon v-else-if="icon || $slots.icon">
      <component :is="icon" v-if="icon" />
      <slot v-else name="icon" />
    </el-icon>
    <span
      v-if="$slots.default"
    >
      <slot />
    </span>
  </component>
</template>

<script lang="ts" setup>
import { useNamespace } from '../../../hooks/use-namespace'
import { buttonEmits, buttonProps } from './button'
import { useButtonCustomStyle } from './button-custom'
import { useButton } from './useButton'

defineOptions({
  name: 'EsButton',
})



const props = defineProps(buttonProps)
const emit = defineEmits(buttonEmits)

const buttonStyle = useButtonCustomStyle(props)
const ns = useNamespace('button')


const { _ref, _size, _type, _disabled } = useButton(props,emit)
console.log('button props', _type)

defineExpose({
  /** @description button html element */
  ref: _ref,
  /** @description button size */
  size: _size,
  /** @description button type */
  type: _type,
  /** @description button disabled */
  disabled: _disabled,
})

</script>
