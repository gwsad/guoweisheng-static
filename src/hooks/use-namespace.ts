/**
 * BEM命名规范 + 命名空间
**/

import { computed, getCurrentInstance, inject, ref, unref } from 'vue'

import type { InjectionKey, Ref } from 'vue'

export const defaultNamespace = 'es'
const statePrefix = 'is-'

/**
 * description: B(block) E(element) M(modifier)
 * 书写规范:
 *    组件就是一个模块 block
 *    连接 blockSuffix 用 - 单横线; 模块后缀，一般用于区分不同模块，如 button、input、table、grid 等
 *    连接 element 用 __双下划线; (表示 block 内更细粒度的元素，一般以布局或功能区分这些元素。)
 *    连接 modifier 用 --单下划线;（用于标记 block 或 element 的不同版本或状态）
 *    B、E、M 尽量都只有1个
 * example: block-blockSuffix__element--modifier
**/
const _bem = (
  namespace: string,
  block: string,
  blockSuffix: string,
  element: string,
  modifier: string
) => {
  let cls = `${namespace}-${block}`
  if (blockSuffix) {
    cls += `-${blockSuffix}`
  }
  if (element) {
    cls += `__${element}`
  }
  if (modifier) {
    cls += `--${modifier}`
  }
  return cls
}

export const namespaceContextKey: InjectionKey<Ref<string | undefined>> =
  Symbol('namespaceContextKey')

// 定义获取全局配置中命名空间的函数 该组件库以 es 为默认命名空间
export const useGetDerivedNamespace = (
  namespaceOverrides?: Ref<string | undefined>
) => {
  // 用于从祖先组件提供的 provide 上下文中获取值。尝试从上层组件中获取以 namespaceContextKey 为键的值，如果没有找到，就使用 ref(defaultNamespace) 作为默认值。
  const derivedNamespace =
    namespaceOverrides ||
    (getCurrentInstance()
      ? inject(namespaceContextKey, ref(defaultNamespace))
      : ref(defaultNamespace))
  // 取derivedNamespace原始值 或 默认值
  const namespace = computed(() => {
    return unref(derivedNamespace) || defaultNamespace
  })
  return namespace
}

export const useNamespace = (
  block: string,
  namespaceOverrides?: Ref<string | undefined>
) => {
  const namespace = useGetDerivedNamespace(namespaceOverrides)
  const b = (blockSuffix = '') =>
    _bem(namespace.value, block, blockSuffix, '', '')
  const e = (element?: string) =>
    element ? _bem(namespace.value, block, '', element, '') : ''
  const m = (modifier?: string) =>
    modifier ? _bem(namespace.value, block, '', '', modifier) : ''
  const be = (blockSuffix?: string, element?: string) =>
    blockSuffix && element
      ? _bem(namespace.value, block, blockSuffix, element, '')
      : ''
  const em = (element?: string, modifier?: string) =>
    element && modifier
      ? _bem(namespace.value, block, '', element, modifier)
      : ''
  const bm = (blockSuffix?: string, modifier?: string) =>
    blockSuffix && modifier
      ? _bem(namespace.value, block, blockSuffix, '', modifier)
      : ''
  const bem = (blockSuffix?: string, element?: string, modifier?: string) =>
    blockSuffix && element && modifier
      ? _bem(namespace.value, block, blockSuffix, element, modifier)
      : ''
  // args[0]! 断言args[0]不会是 null 或 undefined。从而取消编译器对该表达式可能为 null 或 undefined 的类型检查。
  const is: {
    (name: string, state: boolean | undefined): string
    (name: string): string
  } = (name: string, ...args: [boolean | undefined] | []) => {
    const state = args.length >= 1 ? args[0]! : true
    return name && state ? `${statePrefix}${name}` : ''
  }

  // for css var
  // --el-xxx: value;
  const cssVar = (object: Record<string, string>) => {
    const styles: Record<string, string> = {}
    for (const key in object) {
      if (object[key]) {
        styles[`--${namespace.value}-${key}`] = object[key]
      }
    }
    return styles
  }
  // with block
  const cssVarBlock = (object: Record<string, string>) => {
    const styles: Record<string, string> = {}
    for (const key in object) {
      if (object[key]) {
        styles[`--${namespace.value}-${block}-${key}`] = object[key]
      }
    }
    return styles
  }

  const cssVarName = (name: string) => `--${namespace.value}-${name}`
  const cssVarBlockName = (name: string) =>
    `--${namespace.value}-${block}-${name}`

  return {
    namespace,
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is,
    // css
    cssVar,
    cssVarName,
    cssVarBlock,
    cssVarBlockName,
  }
}

export type UseNamespaceReturn = ReturnType<typeof useNamespace>

// example
// const ns = useNamespace('button')
// ns.b() // es-button
// ns.b('group') // es-button-group
// ns.e('title') // es-button__title
// ns.m('primary') // es-button--primary
// ns.be('button', 'original') // es-button-button__original
// ns.em('text', 'expand') // es-button__text--expand
// ns.bm('button', 'small') // es-button-button--small
// ns.bem('bar', 'inner', 'indeterminate') // es-button-bar__inner--indeterminate
// ns.is('disabled', true) // is-disabled
