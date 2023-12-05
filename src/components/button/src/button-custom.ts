import { computed, inject, ref, unref } from 'vue'
import type { MaybeRef } from '@vueuse/core'
import { useNamespace } from '../../../hooks/use-namespace'
import { ButtonProps } from './button'
import { TinyColor } from '@ctrl/tinycolor'

// 定义唯一的 formContext 键名
export const formContextKey = Symbol('formContextKey')

export function darken(color: TinyColor, amount = 20) {
  return color.mix('#141414', amount).toString()
}


const useFormDisabled = (fallback?: MaybeRef<boolean | undefined>) => {
  const disabled = ref('disabled')
  const form = inject(formContextKey, undefined)
  return computed(
    () => disabled.value || unref(fallback) || form?.disabled || false
  )
}

export function useButtonCustomStyle(props: ButtonProps) {
  const _disabled = useFormDisabled()
  const ns = useNamespace('button')

  return computed(() => {
    let styles: Record<string, string> = {}

    const buttonColor = props.color

    if (buttonColor) {
      const color = new TinyColor(buttonColor)
      const activeBgColor = props.dark
        ? color.tint(20).toString()
        : darken(color, 20)

      if (props.plain) {
        styles = ns.cssVarBlock({
          'bg-color': props.dark
            ? darken(color, 90)
            : color.tint(90).toString(),
          'text-color': buttonColor,
          'border-color': props.dark
            ? darken(color, 50)
            : color.tint(50).toString(),
          'hover-text-color': `var(${ns.cssVarName('color-white')})`,
          'hover-bg-color': buttonColor,
          'hover-border-color': buttonColor,
          'active-bg-color': activeBgColor,
          'active-text-color': `var(${ns.cssVarName('color-white')})`,
          'active-border-color': activeBgColor,
        })

        if (_disabled.value) {
          styles[ns.cssVarBlockName('disabled-bg-color')] = props.dark
            ? darken(color, 90)
            : color.tint(90).toString()
          styles[ns.cssVarBlockName('disabled-text-color')] = props.dark
            ? darken(color, 50)
            : color.tint(50).toString()
          styles[ns.cssVarBlockName('disabled-border-color')] = props.dark
            ? darken(color, 80)
            : color.tint(80).toString()
        }
      } else {
        const hoverBgColor = props.dark
          ? darken(color, 30)
          : color.tint(30).toString()
        const textColor = color.isDark()
          ? `var(${ns.cssVarName('color-white')})`
          : `var(${ns.cssVarName('color-black')})`
        styles = ns.cssVarBlock({
          'bg-color': buttonColor,
          'text-color': textColor,
          'border-color': buttonColor,
          'hover-bg-color': hoverBgColor,
          'hover-text-color': textColor,
          'hover-border-color': hoverBgColor,
          'active-bg-color': activeBgColor,
          'active-border-color': activeBgColor,
        })

        if (_disabled.value) {
          const disabledButtonColor = props.dark
            ? darken(color, 50)
            : color.tint(50).toString()
          styles[ns.cssVarBlockName('disabled-bg-color')] = disabledButtonColor
          styles[ns.cssVarBlockName('disabled-text-color')] = props.dark
            ? 'rgba(255, 255, 255, 0.5)'
            : `var(${ns.cssVarName('color-white')})`
          styles[ns.cssVarBlockName('disabled-border-color')] =
            disabledButtonColor
        }
      }
    }

    return styles
  })
}
