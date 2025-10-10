/**
 * @file Internal - util
 * @module unist-util-inspect/internal/util
 */

import type State from '#types/state'
import {
  stringifyPosition
} from '@flex-development/unist-util-stringify-position'
import type { Literal, Node, Parent } from 'unist'

export { inspectValue }

/**
 * Bold the given `value`.
 *
 * @internal
 *
 * @param {string} value
 *  The value to color
 * @return {string}
 *  Colored `value`
 */
const bold: (value: string) => string = ansi(1, 22)

/**
 * Dim the given `value`.
 *
 * @internal
 *
 * @param {string} value
 *  The value to color
 * @return {string}
 *  Colored `value`
 */
const dim: (value: string) => string = ansi(2, 22)

/**
 * Color the given `value` green.
 *
 * @internal
 *
 * @param {string} value
 *  The value to color
 * @return {string}
 *  Colored `value`
 */
const green: (value: string) => string = ansi(32, 39)

/**
 * Color the given `value` yellow.
 *
 * @internal
 *
 * @param {string} value
 *  The value to color
 * @return {string}
 *  Colored `value`
 */
const yellow: (value: string) => string = ansi(33, 39)

/**
 * Factory to wrap values in ANSI colors.
 *
 * @internal
 *
 * @param {number} open
 *  The opening color code
 * @param {number} close
 *  The closing color code
 * @return {(value: string) => string}
 *  Function to colorize a value
 */
function ansi(open: number, close: number): (value: string) => string {
  return color

  /**
   * Colorize `value`.
   *
   * @param {string} value
   *  The value to color
   * @return {string}
   *  Colored `value`
   */
  function color(value: string): string {
    return '\u001B[' + open + 'm' + value + '\u001B[' + close + 'm'
  }
}

/**
 * Indent `value`.
 *
 * @internal
 *
 * @param {string} value
 *  The value to ident
 * @param {string} indentation
 *  The indent to use
 * @param {boolean | undefined} [skipFirst]
 *  Whether to skip indenting first line
 * @return {string}
 *  Indented `value`
 */
function indent(
  value: string,
  indentation: string,
  skipFirst?: boolean | undefined
): string {
  if (!value) return value

  /**
   * Lines to indent.
   *
   * @const {string[]} lines
   */
  const lines: string[] = value.split('\n')

  /**
   * Index of current line.
   *
   * @var {number} index
   */
  let index: number = skipFirst ? 0 : -1

  // indent lines
  while (++index < lines.length) lines[index] = indentation + lines[index]!

  return lines.join('\n')
}

/**
 * Format the fields of a node.
 *
 * @internal
 *
 * @param {Record<string, any>} fields
 *  Fields to format
 * @param {State} state
 *  Info passed around
 * @return {string}
 *  Pretty printed `fields`
 */
function inspectFields(fields: Record<string, any>, state: State): string {
  /**
   * Formatted parts array.
   *
   * @const {string[]} parts
   */
  const parts: string[] = []

  /**
   * Current key.
   *
   * @var {string} key
   */
  let key: string

  for (key in fields) {
    if (Object.prototype.hasOwnProperty.call(fields, key)) {
      /**
       * Field value.
       *
       * @const {any} value
       */
      const value: any = fields[key]

      if (
        // standard keys defined by unist that are formatted differently
        // <https://github.com/syntax-tree/unist>
        key === 'children' ||
        key === 'position' ||
        key === 'type' ||
        key === 'value' ||
        // ignore `name` (esast, xast) and `tagName` (`hast`)
        (typeof value === 'string' && (key === 'name' || key === 'tagName'))
      ) {
        continue
      }

      /**
       * Formatted value.
       *
       * @var {string} formatted
       */
      let formatted: string

      if (
        nodelike(value) &&
        key !== 'attributes' &&
        key !== 'data' &&
        key !== 'properties'
      ) {
        formatted = inspectTree(value, state)
      } else if (Array.isArray(value) && nodelike(value[0])) {
        formatted = '\n' + inspectNodes(value, state)
      } else {
        formatted = inspectNonTree(value)
      }

      parts.push(
        key + dim(':') + (/\s/.test(formatted.charAt(0)) ? '' : ' ') + formatted
      )
    }
  }

  return indent(
    parts.join('\n'),
    (Array.isArray(fields['children']) && fields['children'].length > 0
      ? dim('│')
      : ' ') + ' '
  )
}

/**
 * Format a node.
 *
 * @internal
 *
 * @param {Node | Literal | Parent} node
 *  The node to format
 * @param {State} state
 *  Info passed around
 * @return {string}
 *  Pretty printed `node`
 */
function inspectNode(node: Node | Literal | Parent, state: State): string {
  /**
   * Formatted parts array.
   *
   * @const {string[]} parts
   */
  const parts: string[] = [bold(node.type)]

  /**
   * Node kind.
   *
   * @const {string | undefined} kind
   */
  const kind: string | undefined =
    'tagName' in node && typeof node.tagName === 'string'
      ? node.tagName
      : 'name' in node && typeof node.name === 'string'
      ? node.name
      : undefined

  // format node kind
  if (kind) parts.push('<' + kind + '>')

  // format node children or value
  if ('children' in node && Array.isArray(node.children)) {
    parts.push(dim('['), yellow(String(node.children.length)), dim(']'))
  } else if ('value' in node) {
    if (
      typeof node.value !== 'function' &&
      (typeof node.value !== 'object' || node.value === null) &&
      typeof node.value !== 'symbol'
    ) {
      parts.push(' ', green(inspectNonTree(node.value)))
    }
  }

  // format position
  if (state.positions && node.position) {
    parts.push(' ', dim('('))
    parts.push(stringifyPosition(node, { offsets: true }), dim(')'))
  }

  return parts.join('')
}

/**
 * Format a list of nodes.
 *
 * @internal
 *
 * @param {unknown[]} nodes
 *  The nodes to format
 * @param {State} state
 *  Info passed around
 * @return {string}
 *  Pretty printed `nodes`
 */
function inspectNodes(nodes: unknown[], state: State): string {
  /**
   * List size.
   *
   * @const {number} size
   */
  const size: number = String(nodes.length - 1).length

  /**
   * Formatted parts array.
   *
   * @const {string[]} parts
   */
  const parts: string[] = []

  /**
   * Index of current node.
   *
   * @var {number} index
   */
  let i: number = -1

  // format node list
  while (++i < nodes.length) {
    /**
     * Last node?
     *
     * @const {boolean} end
     */
    const end: boolean = i === nodes.length - 1

    /**
     * Formatted part.
     *
     * @var {string} part
     */
    let part: string = dim((end ? '└' : '├') + '─' + String(i).padEnd(size))

    // finish formatting
    part += ' ' + indent(
      inspectValue(nodes[i], state),
      (end ? ' ' : dim('│')) + ' '.repeat(size + 2),
      true
    )

    parts.push(part)
  }

  return parts.join('\n')
}

/**
 * Format an unknown value.
 *
 * @internal
 *
 * @param {unknown} value
 *  The thing to format
 * @return {string}
 *  Pretty printed `value`
 */
function inspectNonTree(value: unknown): string {
  return value === undefined
    ? 'undefined'
    : typeof value === 'bigint'
    ? value.toLocaleString() + 'n'
    : JSON.stringify(value)
}

/**
 * Format a `node`, its fields, and its children.
 *
 * @internal
 *
 * @param {Node | Literal | Parent} node
 *  The node to format
 * @param {State} state
 *  Info passed around
 * @return {string}
 *  Pretty printed `node`
 */
function inspectTree(node: Node | Literal | Parent, state: State): string {
  /**
   * Formatted parts array.
   *
   * @const {string[]} parts
   */
  const parts: string[] = [inspectNode(node, state)]

  /**
   * Formatted fields.
   *
   * @const {string} fields
   */
  const fields: string = inspectFields(node, state)

  /**
   * Formatted node children.
   *
   * @const {string} children
   */
  const children: string = 'children' in node && Array.isArray(node.children)
    ? inspectNodes(node.children, state)
    : ''

  if (fields) parts.push(fields)
  if (children) parts.push(children)

  return parts.join('\n')
}

/**
 * Format any value.
 *
 * @internal
 *
 * @param {unknown} value
 *  The thing to format
 * @param {State} state
 *  Info passed around
 * @return {string}
 *  Pretty printed `value`
 */
function inspectValue(value: unknown, state: State): string {
  if (Array.isArray(value)) return inspectNodes(value, state)
  if (nodelike(value)) return inspectTree(value, state)
  return inspectNonTree(value)
}

/**
 * Check if something looks like a {@linkcode Node}.
 *
 * @internal
 *
 * @param {unknown} value
 *  The thing to check
 * @return {value is Node}
 *  `true` if `value` looks like a node, `false` otherwise
 */
function nodelike(value: unknown): value is Node {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    typeof value.type === 'string'
  )
}
