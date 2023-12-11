
/**
 * The inverse of `toPairs`is method returns an object composed
 * from key-value `pairs`.
 * fromPairs([['a', 1], ['b', 2]])
 * // => { 'a': 1, 'b': 2 }
 */
export function fromPairs(pairs: Array<[string, any]>): Record<string, any> {
  const result = {}
  if (pairs == null) {
    return result
  }
  for (const pair of pairs) {
    result[pair[0]] = pair[1]
  }
  return result
}

/**
 * Checks if `value` is `null` or `undefined`.
 * _.isNil(null);
 * // => true
 *
 * _.isNil(void 0);
 * // => true
 *
 * _.isNil(NaN);
 * // => false
 */
export function isNil(value: any): boolean {
  return value == null;
}