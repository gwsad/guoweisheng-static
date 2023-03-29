export const isLocalStorageSupported = (): boolean => {
  const testKey = 'test'
  const storage = window.sessionStorage
  try {
    storage.setItem(testKey, 'testValue')
    storage.removeItem(testKey)
    return true
  } catch (error) {
    return false
  }
}
