import {buildProps, definePropType, iconPropType } from '../../../props/runTime'
import { Loading } from '@element-plus/icons-vue'
import type { Component, ExtractPropTypes } from 'vue'

export const buttonTypes = [
  'default',
  'primary',
  'success',
  'warning',
  'info',
  'danger',
  'text',
  '',
] as const

export const buttonSizeTypes = ['large','default','small','mini'] as const

export const buttonProps = buildProps({
  /**
   * @description button size
   */
  size: buttonSizeTypes,
  /**
   * @description disable the button
   */
  disabled: Boolean,
  /**
   * @description button type
   */
  type: {
    type: String,
    values: buttonTypes,
    default: '',
  },
  /**
   * @description icon component
   */
  icon: {
    type: iconPropType,
  },
  /**
   * @description determine whether it's loading
   */
  loading: Boolean,
  /**
   * @description customize loading icon component
   */
  loadingIcon: {
    type: iconPropType,
    default: () => Loading,
  },
  /**
   * @description determine whether it's a plain button
   */
  plain: Boolean,
  /**
   * @description determine whether it's a text button
   */
  text: Boolean,
  /**
   * @description determine whether it's a link button
   */
  link: Boolean,
  /**
   * @description determine whether the text button background color is always on
   */
  bg: Boolean,
  /**
   * @description native button autofocus
   */
  autofocus: Boolean,
  /**
   * @description determine whether it's a round button
   */
  round: Boolean,
  /**
   * @description determine whether it's a circle button
   */
  circle: Boolean,
  /**
   * @description custom button color, automatically calculate `hover` and `active` color
   */
  color: String,
  /**
   * @description dark mode, which automatically converts `color` to dark mode colors
   */
  dark: Boolean
} as const)
export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
export type ButtonEmits = typeof buttonEmits

export type ButtonType = ButtonProps['type']
export type ButtonNativeType = ButtonProps['nativeType']
