import { isLocalStorageSupported } from "./fun"

function getStorageType (type) {
  const storeType = type == 'local' ? 'localStorage': 'sessionStorage'
  return window[storeType]
}

/**
 * @param  {Object}  value
 * @return {String}  value
 */
function serialize (value: any): string {
  if (typeof value == 'object') {
    return JSON.stringify(value)
  } else {
    return value
  }
}
/**
 * @param  {String} value
 * @return {String} value
 */
function deserialize (value: string): string {
  try {
    return JSON.parse(value)
  } catch (e) {
    return value
  }
}

const Store = Object.create(null)

if (isLocalStorageSupported()) {
  Store.set = (key: string, val: any, type: string): void =>  {
    const storage = getStorageType(type)
    if (typeof val == 'object') {
      storage[key] = serialize(val)
    } else {
      storage[key] = val
    }
  }
  Store.get = (key: string, type: string): string => {
    const storage = getStorageType(type)
    return deserialize(storage[key])
  }
  Store.remove = (key: string, type: string): void => {
    const storage = getStorageType(type)
    delete storage[key]
  }
  Store.clear = (type: string): void => {
    const storage = getStorageType(type)
    storage.clear()
  }
} else {
  let windowStorage = Object.create(null)
  Store.set = (key: string, val: any): void => {
    if (window.name) {
      windowStorage = deserialize(window.name)
    }
    windowStorage[key] = val
    window.name = serialize(windowStorage)
  }
  Store.get = (key: string): string => {
    if (window.name) {
      return deserialize(window.name)[key]
    } else {
      return ''
    }
  }
  Store.remove = (key: string): void => {
    windowStorage = deserialize(window.name)
    delete windowStorage[key]
    window.name = serialize(windowStorage)
  }
  Store.clear = (): void => {
    window.name = ''
  }
}

export default Store

