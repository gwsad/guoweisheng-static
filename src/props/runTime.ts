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


export const buildProps = (
  props: Record<string, any>
)=> fromPairs(
  Object.entries(props).map(([key, option]) => [
    key,
    buildProp(option as any, key),
  ])
) as any

