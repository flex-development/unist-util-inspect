/**
 * @file Type Tests - State
 * @module unist-util-inspect/types/tests/unit-d/State
 */

import type TestSubject from '#types/state'

describe('unit-d:types/State', () => {
  it('should match [positions: boolean]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('positions')
      .toEqualTypeOf<boolean>()
  })
})
