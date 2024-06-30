/**
 * @file E2E Tests - api
 * @module unist-util-inspect/tests/e2e/api
 */

import * as testSubject from '../index'

describe('e2e:unist-util-inspect', () => {
  it('should expose public api', () => {
    expect(testSubject).to.have.keys([
      'inspect',
      'inspectColor',
      'inspectNoColor'
    ])
  })
})
