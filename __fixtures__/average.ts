/**
 * @file Fixtures - average
 * @module fixtures/average
 * @see https://codewars.com/kata/57a2013acf1fa5bfc4000921
 */

/**
 * Get the average of an array of numbers.
 *
 * @example
 *  average([]) // 0
 * @example
 *  average([1, 1, 1]) // 1
 *
 * @param {number[]} arr - Number array
 * @return {number} Average
 */
function average(arr: number[]): number {
  return arr.length > 0 ? arr.reduce((acc, n) => acc + n, 0) / arr.length : 0
}

export default average
