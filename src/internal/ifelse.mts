/**
 * @file Internal - ifelse
 * @module unist-util-inspect/internal/ifelse
 */

export default ifelse

/**
 * Return `truthy` if `condition` is `true`, or `falsy` otherwise.
 *
 * @internal
 *
 * @template T
 *  Truthy value type
 * @template F
 *  Falsy value type
 *
 * @this {void}
 *
 * @param {boolean | ((this: void) => boolean)} condition
 *  The condition to evaluate
 * @param {T} truthy
 *  The value to return if `condition` evaluates to `true`
 * @param {F} falsy
 *  The value to return if `condition` evaluates to `false`
 * @return {F | T}
 *  Condition result
 */
function ifelse<T, F>(
  this: void,
  condition: boolean | ((this: void) => boolean),
  truthy: T,
  falsy: F
): F | T {
  if (typeof condition !== 'boolean') condition = condition()
  return condition ? truthy : falsy
}
