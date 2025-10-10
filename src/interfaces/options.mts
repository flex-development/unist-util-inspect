/**
 * @file Interfaces - Options
 * @module unist-util-inspect/interfaces/Options
 */

/**
 * Configuration options.
 */
interface Options {
  /**
   * Whether to include positional information.
   *
   * @default true
   */
  positions?: boolean | null | undefined
}

export type { Options as default }
