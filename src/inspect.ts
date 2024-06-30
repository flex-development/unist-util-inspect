/**
 * @file inspect
 * @module unist-util-inspect/inspect
 */

import { color } from '#conditional-color'
import type { Options } from './types'
import { inspectValue } from './util'

/**
 * Regular expression matching an ANSI color.
 *
 * @const {RegExp} COLOR_RE
 */
const COLOR_RE: RegExp =
  /(?:(?:\u001B\[)|\u009B)(?:\d{1,3})?(?:(?:;\d{0,3})*)?[A-Mf-m|]|\u001B[A-M]/g

/**
 * Inspect a node, with color in Node, without color in browsers.
 *
 * @see {@linkcode Options}
 *
 * @param {unknown} tree - Tree to inspect
 * @param {(Options | null)?} [options] - Configuration options
 * @return {string} Pretty printed `tree`
 */
/* c8 ignore next 3 */
const inspect: (tree: unknown, options?: Options | null) => string = color
  ? inspectColor
  : inspectNoColor

/**
 * Inspect a node, using color.
 *
 * @see {@linkcode Options}
 *
 * @param {unknown} tree - Tree to inspect
 * @param {(Options | null)?} [options] - Configuration options
 * @return {string} Pretty printed `tree`
 */
function inspectColor(tree: unknown, options?: Options | null): string {
  return inspectValue(tree, { positions: options?.positions ?? true })
}

/**
 * Inspect a node, without color.
 *
 * @see {@linkcode Options}
 *
 * @param {unknown} tree - Tree to inspect
 * @param {(Options | null)?} [options] - Configuration options
 * @return {string} Pretty printed `tree`
 */
function inspectNoColor(tree: unknown, options?: Options | null): string {
  return inspectColor(tree, options).replace(COLOR_RE, '')
}

export { inspect, inspectColor, inspectNoColor }
