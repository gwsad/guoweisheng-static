import { Text, computed, inject, ref, useSlots } from 'vue'
import type { InjectionKey, SetupContext } from 'vue'
import type { ButtonProps,ButtonEmits } from './button'

interface ButtonGroupContext {
  size?: ButtonProps['size']
  type?: ButtonProps['type']
}

// 确保注入使用的key是唯一的,不会被使用时产生覆盖的问题，为了获取按钮的上下文
const buttonGroupContextKey: InjectionKey<ButtonGroupContext> = Symbol(
  'buttonGroupContextKey'
)

export const useButton = (
  props: ButtonProps,
  emit: SetupContext<ButtonEmits>['emit']
) => {
  const buttonGroupContext = inject(buttonGroupContextKey, undefined)
  const _size = computed(() => props.size || buttonGroupContext?.size)
  const _disabled = computed(() => props.disabled || buttonGroupContext?.disabled)
  const _ref = ref<HTMLButtonElement>()

  const _type = computed(() => props.type || buttonGroupContext?.type || '')

  return {
    _disabled,
    _size,
    _type,
    _ref
  }
}
