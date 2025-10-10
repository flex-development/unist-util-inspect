/**
 * @file Functional Tests - inspect
 * @module unist-util-inspect/tests/functional/inspect
 */

import { inspect as testSubject } from '#inspect'
import type * as docast from '@flex-development/docast'
import { fromDocs } from '@flex-development/docast-util-from-docs'
import { u } from '@flex-development/unist-util-builder'
import { h } from 'hastscript'
import { readSync as read } from 'to-vfile'
import type { Literal, Node, Parent } from 'unist'
import { fromXml } from 'xast-util-from-xml'

describe('functional:inspect', () => {
  it.each<Node>([
    u('element', { content: u('root', []), tagName: 'template' }),
    u('jsxSpan', {
      children: [u('jsxExpressionSpan', '1 + 1')],
      close: u('jsxTag', {
        attributes: [],
        close: true,
        name: u('jsxMember', {
          object: u('jsxMember', {
            object: u('jsxIdentifier', 'abc'),
            property: u('jsxIdentifier', 'def')
          }),
          property: u('jsxIdentifier', 'ghi')
        }),
        selfClosing: false
      }),
      open: u('jsxTag', {
        attributes: [
          u('jsxAttribute', {
            name: u('jsxIdentifier', 'alpha'),
            value: null
          }),
          u('jsxAttributeExpression', '...props'),
          u('jsxAttribute', {
            name: u('jsxIdentifier', 'bravo'),
            value: null
          })
        ],
        close: false,
        name: u('jsxMember', {
          object: u('jsxMember', {
            object: u('jsxIdentifier', 'abc'),
            property: u('jsxIdentifier', 'def')
          }),
          property: u('jsxIdentifier', 'ghi')
        }),
        selfClosing: false
      })
    })
  ])('should handle nodes outside of children (sample %#)', tree => {
    expect(testSubject(tree)).toMatchSnapshot()
  })

  it('should see attributes as data', () => {
    expect(testSubject(fromXml('<album id="123" />'))).toMatchSnapshot()
  })

  it('should see data as data', () => {
    expect(testSubject(u('album', { data: { id: '123' } }))).toMatchSnapshot()
  })

  it('should see properties as data', () => {
    // Arrange
    const tree: Node = h('button', { type: 'submit', value: 'Send' })

    // Act + Expect
    expect(testSubject(tree)).toMatchSnapshot()
  })

  it('should support `positions: false`', () => {
    // Arrange
    const tree: docast.Root = fromDocs(read('__fixtures__/average.ts'))

    // Act
    const result = testSubject(tree.children[0], { positions: false })

    // Act + Expect
    expect(result).toMatchSnapshot()
  })

  it.each<Parent>([
    u('root', []),
    fromDocs(read('__fixtures__/diff.ts'))
  ])('should work with list of nodes (sample %#)', tree => {
    expect(testSubject(tree.children)).toMatchSnapshot()
  })

  it.each<Literal>([
    u('bigint', 0xdn),
    u('boolean', true),
    u('number', 3),
    u('regexp', {
      flags: 'u',
      pattern: '(?<=(?<a>\\w){3})f',
      value: '/(?<=(?<a>\\w){3})f/u'
    }),
    u('string', ''),
    u('null', null),
    u('undefined', { value: undefined })
  ])('should work with literals (sample %#)', tree => {
    expect(testSubject(tree)).toMatchSnapshot()
  })

  it.each<Parent>([
    u('root', []),
    u('table', {
      align: ['center', 'left'],
      children: [
        u('tableRow', {
          children: [
            u('tableCell', [u('text', 'foo')]),
            u('tableCell', [u('text', 'bar')])
          ]
        }),
        u('tableRow', {
          children: [
            u('tableCell', [u('text', 'baz')]),
            u('tableCell', [u('text', 'qux')])
          ]
        })
      ]
    }),
    fromDocs(read('__fixtures__/hrt.ts'))
  ])('should work with parents (sample %#)', tree => {
    expect(testSubject(tree)).toMatchSnapshot()
  })

  it.each<unknown>([
    'node',
    13,
    Number.NaN,
    null
  ])('should work with non-nodes (sample %#)', tree => {
    expect(testSubject(tree)).toMatchSnapshot()
  })

  it('should work with void nodes', () => {
    expect(testSubject(u('break'))).toMatchSnapshot()
  })
})
