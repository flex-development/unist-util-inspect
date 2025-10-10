/**
 * @file inspect
 * @module unist-util-inspect/inspect
 */

import ifelse from '#internal/ifelse'
import { inspectValue } from '#internal/util'
import { isColorSupported, stripAnsi } from '@flex-development/colors'
import type { Inspect, Options } from '@flex-development/unist-util-inspect'

export { inspect, inspectColor, inspectNoColor }

/**
 * Inspect a tree with color in supported environments or without color in
 * environments that do not support color.
 *
 * @see {@linkcode Inspect}
 *
 * @const {Inspect} inspect
 */
const inspect: Inspect = ifelse(isColorSupported, inspectColor, inspectNoColor)

/**
 * Inspect a `tree` with color.
 *
 * @see {@linkcode Options}
 *
 * @this {void}
 *
 * @param {unknown} tree
 *  The tree to inspect
 * @param {Options | null | undefined} [options]
 *  Configuration options
 * @return {string}
 *  Pretty printed `tree`
 */
function inspectColor(
  this: void,
  tree: unknown,
  options?: Options | null | undefined
): string {
  return inspectValue(tree, { positions: options?.positions ?? true })
}

/**
 * Inspect a `tree` without color.
 *
 * @see {@linkcode Options}
 *
 * @this {void}
 *
 * @param {unknown} tree
 *  The tree to inspect
 * @param {Options | null | undefined} [options]
 *  Configuration options
 * @return {string}
 *  Pretty printed `tree`
 */
function inspectNoColor(
  this: void,
  tree: unknown,
  options?: Options | null | undefined
): string {
  return stripAnsi(inspectColor(tree, options))
}
