/**
 * @file Type Tests - Options
 * @module unist-util-inspect/interfaces/tests/unit-d/Options
 */

import type TestSubject from '#interfaces/options'
import type { Nilable } from '@flex-development/tutils'

describe('unit-d:interfaces/Options', () => {
  it('should match [positions?: boolean | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('positions')
      .toEqualTypeOf<Nilable<boolean>>()
  })
})
