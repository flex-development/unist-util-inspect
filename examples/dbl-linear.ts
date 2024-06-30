/**
 * @file dblLinear
 * @module dblLinear
 * @see https://codewars.com/kata/5672682212c8ecf83e000050
 */

/**
 * Consider a sequence `u` where `u` is defined as follows:
 *
 *  1. The number `u(0) = 1` is the first one in `u`
 *  2. For each `x` in `u`, `y = 2x + 1` and `z = 3x + 1` must be in `u` too
 *  3. There are no other numbers in `u`
 *
 * Given an index, `n`, the function returns the element at `u(n)`.
 *
 * @example
 *  await dblLinear(0) // 1
 * @example
 *  await dblLinear(10) // 22
 * @example
 *  await dblLinear(100) // 447
 * @example
 *  await dblLinear(7687) // 111718
 *
 * @param {number} n - Sequence element index
 * @return {number} Element at `u(n)`
 */
function dblLinear(n: number): number {
  /**
   * Sequence.
   *
   * @const {number[]} u
   */
  const u: number[] = [1]

  /**
   * Index of x in {@linkcode u} used to calculate y.
   *
   * @var {number} j
   */
  let j: number = 0

  /**
   * Index of x in {@linkcode u} used to calculate z.
   *
   * @var {number} j
   */
  let k: number = 0

  // build sequence up to index n (inclusive)
  for (let i = 1; i <= n; i++) {
    /**
     * `y`.
     *
     * @const {number} y
     */
    const y: number = 2 * u[j]! + 1

    /**
     * `z`.
     *
     * @const {number} z
     */
    const z: number = 3 * u[k]! + 1

    // set sequence value to smallest value in [y, z]
    u[i] = Math.min(y, z)

    if (u[i] === y) j++
    if (u[i] === z) k++
  }

  return u[n]!
}

export default dblLinear
