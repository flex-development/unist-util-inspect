/**
 * @file Type Aliases - Inspect
 * @module unist-util-inspect/types/Inspect
 */

import type { Options } from '@flex-development/unist-util-inspect'

/**
 * Inspect a tree.
 *
 * @see {@linkcode Options}
 *
 * @param {unknown} tree
 *  The tree to inspect
 * @param {Options | null | undefined} [options]
 *  Configuration options
 * @return {string}
 *  Pretty printed `tree`
 */
type Inspect = (tree: unknown, options?: Options | null | undefined) => string

export type { Inspect as default }
