/**
 * @file Configuration - Build
 * @module config/build
 * @see https://github.com/flex-development/mkbuild
 */

import { defineBuildConfig, type Config } from '@flex-development/mkbuild'
import tsconfig from './tsconfig.build.json' assert { type: 'json' }

/**
 * Build configuration options.
 *
 * @const {Config} config
 */
const config: Config = defineBuildConfig({
  charset: 'utf8',
  entries: [
    { dts: false, pattern: ['color.*'] },
    { dts: false, ignore: ['color.*', 'types'] },
    { dts: 'only', ignore: ['color.*', 'util.ts'] }
  ],
  target: ['node18', tsconfig.compilerOptions.target],
  tsconfig: 'tsconfig.build.json'
})

export default config
