/**
 * @file Type Tests - Inspect
 * @module unist-util-inspect/types/tests/unit-d/Inspect
 */

import type TestSubject from '#types/inspect'
import type { Options } from '@flex-development/unist-util-inspect'

describe('unit-d:types/Inspect', () => {
  it('should match [this: unknown]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<unknown>()
  })

  describe('parameters', () => {
    it('should be callable with [unknown, (Options | null | undefined)?]', () => {
      expectTypeOf<TestSubject>()
        .parameters
        .toEqualTypeOf<[unknown, (Options | null | undefined)?]>()
    })
  })

  describe('returns', () => {
    it('should return string', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<string>()
    })
  })
})
