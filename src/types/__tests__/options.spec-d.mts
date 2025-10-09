/**
 * @file Type Tests - Options
 * @module unist-util-inspect/types/tests/unit-d/Options
 */

import type TestSubject from '#types/options'
import type { Nilable } from '@flex-development/tutils'

describe('unit-d:types/Options', () => {
  it('should match [positions?: boolean | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('positions')
      .toEqualTypeOf<Nilable<boolean>>()
  })
})
