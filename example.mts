/**
 * @file Example
 * @module example
 */

import type * as docast from '@flex-development/docast'
import { fromDocs } from '@flex-development/docast-util-from-docs'
import { inspect } from '@flex-development/unist-util-inspect'
import { read } from 'to-vfile'
import type { VFile } from 'vfile'

const file: VFile = await read('dbl-linear.mts')

const tree: docast.Root = fromDocs(file)

console.log(inspect(tree))
