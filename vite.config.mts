/**
 * @file Configuration - Vite
 * @module config/vite
 * @see https://vite.dev/config
 */

import type { UserConfig } from 'vite'
import tsconfig from './tsconfig.test.json' with { type: 'json' }

/**
 * Vite configuration.
 *
 * @const {UserConfig} config
 */
const config: UserConfig = {
  resolve: {
    conditions: [...tsconfig.compilerOptions.customConditions, 'browser']
  }
}

export default config
