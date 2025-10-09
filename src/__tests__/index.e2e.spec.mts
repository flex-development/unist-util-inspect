/**
 * @file E2E Tests - api
 * @module unist-util-inspect/tests/e2e/api
 */

import * as testSubject from '@flex-development/unist-util-inspect'

describe('e2e:unist-util-inspect', () => {
  it('should expose public api', () => {
    expect(Object.keys(testSubject)).toMatchSnapshot()
  })
})
