import type { PropType, Component } from 'vue'
import { fromPairs } from 'lodash-unified'
import { isObject, hasOwn } from '../librarys/vueShared'

export const definePropType = <T>(val: any): PropType<T> => val
export const isEpProp = (val: unknown): val is EpProp<any, any, any> =>
  isObject(val) && !!(val as any)[epPropKey]

export const epPropKey = '__epPropKey'

export const iconPropType = definePropType<string | Component>([
  String,
  Object,
  Function,
])

export const buildProp = (
  prop,
  key
) => {
  // filter native prop type and nested prop, e.g `null`, `undefined` (from `buildProps`)
  if (!isObject(prop) || isEpProp(prop)) return prop as any

  const { values, required, default: defaultValue, type, validator } = prop

  const _validator =
    values || validator
      ? (val: unknown) => {
          let valid = false
          let allowedValues: unknown[] = []

          if (values) {
            allowedValues = Array.from(values)
            if (hasOwn(prop, 'default')) {
              allowedValues.push(defaultValue)
            }
            valid ||= allowedValues.includes(val)
          }
          if (validator) valid ||= validator(val)

          if (!valid && allowedValues.length > 0) {
            const allowValuesText = [...new Set(allowedValues)]
              .map((value) => JSON.stringify(value))
              .join(', ')
              console.warn(
                `Invalid prop: validation failed${
                  key ? ` for prop "${key}"` : ''
                }. Expected one of [${allowValuesText}], got value ${JSON.stringify(
                  val
                )}.`
              )
          }
          return valid
        }
      : undefined

  const epProp: any = {
    type,
    required: !!required,
    validator: _validator,
    [epPropKey]: true,
  }
  if (hasOwn(prop, 'default')) epProp.default = defaultValue
  return epProp
}

// Object.entries 将 props 转换为二维数组
// 将二维数组以 key option 的形式取出，实际上就是拿到了 props 中的参数的 key 和 value
// 将 value 通过 buildProp 函数处理一下
// fromPairs 又将二维数组转换成 object,实际是一种对props进行进一步处理，方便在组件中使用
// 将props中每个参数都变为
// {
//   type: props.type,
//   required: false,
//   validator: props.value,
//   [epPropKey]: true,
// }
export const buildProps = (
  props: Record<string, any>
)=> fromPairs(
  Object.entries(props).map(([key, option]) => [
    key,
    buildProp(option as any, key),
  ])
) as any

