# unist-util-inspect

[![ci](https://github.com/flex-development/unist-util-inspect/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/flex-development/unist-util-inspect/actions/workflows/ci.yml)
[![github release](https://img.shields.io/github/v/release/flex-development/unist-util-inspect.svg?include_prereleases\&sort=semver)](https://github.com/flex-development/unist-util-inspect/releases/latest)
[![npm](https://img.shields.io/npm/v/@flex-development/unist-util-inspect.svg)](https://npmjs.com/package/@flex-development/unist-util-inspect)
[![npm downloads](https://img.shields.io/npm/dm/@flex-development/unist-util-inspect.svg)](https://www.npmcharts.com/compare/@flex-development/unist-util-inspect?interval=30)
[![install size](https://packagephobia.now.sh/badge?p=@flex-development/unist-util-inspect)](https://packagephobia.now.sh/result?p=@flex-development/unist-util-inspect)
[![codecov](https://codecov.io/gh/flex-development/unist-util-inspect/graph/badge.svg?token=4mBj091twh)](https://codecov.io/gh/flex-development/unist-util-inspect)
[![module type: esm](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://github.com/voxpelli/badges-cjs-esm)
[![license](https://img.shields.io/github/license/flex-development/unist-util-inspect.svg)](LICENSE.md)
[![conventional commits](https://img.shields.io/badge/-conventional%20commits-fe5196?logo=conventional-commits\&logoColor=ffffff)](https://conventionalcommits.org/)
[![typescript](https://img.shields.io/badge/-typescript-3178c6?logo=typescript\&logoColor=ffffff)](https://typescriptlang.org/)
[![vitest](https://img.shields.io/badge/-vitest-6e9f18?style=flat\&logo=vitest\&logoColor=ffffff)](https://vitest.dev/)
[![yarn](https://img.shields.io/badge/-yarn-2c8ebb?style=flat\&logo=yarn\&logoColor=ffffff)](https://yarnpkg.com/)

[unist][] utility to inspect trees

## Contents

- [What is this?](#what-is-this)
- [When should I use this?](#when-should-i-use-this)
- [Install](#install)
- [Use](#use)
- [API](#api)
  - [`inspect(tree[, options])`](#inspecttree-options)
  - [`inspectColor(tree[, options])`](#inspectcolortree-options)
  - [`inspectNoColor(tree[, options])`](#inspectnocolortree-options)
  - [`Options`](#options)
- [Types](#types)
- [Contribute](#contribute)

## What is this?

This is a tiny, but useful, package that pretty prints any [unist][] [*tree*][tree].

## When should I use this?

This utility pretty prints the tree in a format custom made for unist trees. This is useful for spotting bugs, as well
as getting an idea of whats going on in the tree. Both trees and node lists can be printed.

## Install

This package is [ESM only][esm].

In Node.js (18+) with [yarn][]:

```sh
yarn add @flex-development/unist-util-inspect
```

<blockquote>
  <small>
    See <a href='https://yarnpkg.com/protocol/git'>Git - Protocols | Yarn</a>
    &nbsp;for info regarding installing from Git.
  </small>
</blockquote>

In Deno with [`esm.sh`][esmsh]:

```ts
import { inspect } from 'https://esm.sh/@flex-development/unist-util-inspect'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import { inspect } from 'https://esm.sh/@flex-development/unist-util-inspect'
</script>
```

With [bun][]:

```sh
bun add @flex-development/unist-util-inspect
```

## Use

Suppose we have the file [`dbl-linear.mts`](./dbl-linear.mts), and the following module, [`example.mts`](./example.mts):

```ts
import type * as docast from '@flex-development/docast'
import { fromDocs } from '@flex-development/docast-util-from-docs'
import { inspect } from '@flex-development/unist-util-inspect'
import { read } from 'to-vfile'
import type { VFile } from 'vfile'

const file: VFile = await read('dbl-linear.mts')

const tree: docast.Root = fromDocs(file)

console.log(inspect(tree))
```

...running `node --experimental-strip-types --experimental-transform-types ./example.mts` yields:

```sh
root[7]
├─0 comment[3] (1:1-5:4, 0-106)
│   ├─0 blockTag<@file>[1] (2:4-2:19, 7-22)
│   │   └─0 text "dblLinear" (2:10-2:19, 13-22)
│   ├─1 blockTag<@module>[1] (3:4-3:21, 26-43)
│   │   └─0 text "dblLinear" (3:12-3:21, 34-43)
│   └─2 blockTag<@see>[1] (4:4-4:59, 47-102)
│       └─0 text "https://codewars.com/kata/5672682212c8ecf83e000050" (4:9-4:59, 52-102)
├─1 comment[7] (7:1-27:4, 108-684)
│   ├─0 description[7] (8:4-14:68, 115-416)
│   │   ├─0 paragraph[5] (8:4-8:60, 115-171)
│   │   │   ├─0 text "Consider a sequence " (8:4-8:24, 115-135)
│   │   │   ├─1 inlineCode "u" (8:24-8:27, 135-138)
│   │   │   ├─2 text " where " (8:27-8:34, 138-145)
│   │   │   ├─3 inlineCode "u" (8:34-8:37, 145-148)
│   │   │   └─4 text " is defined as follows:" (8:37-8:60, 148-171)
│   │   ├─1 break (8:60-9:1, 171-172)
│   │   ├─2 break (9:3-10:1, 174-175)
│   │   │     data: {"blank":true}
│   │   ├─3 list[3] (1:1-1:1)
│   │   │   │ ordered: true
│   │   │   │ start: 1
│   │   │   │ spread: false
│   │   │   ├─0 listItem[4] (10:5-10:53, 179-227)
│   │   │   │   │ spread: false
│   │   │   │   │ checked: null
│   │   │   │   ├─0 text "The number " (10:8-10:19, 182-193)
│   │   │   │   ├─1 inlineCode "u(0) = 1" (10:19-10:29, 193-203)
│   │   │   │   ├─2 text " is the first one in " (10:29-10:50, 203-224)
│   │   │   │   └─3 inlineCode "u" (10:50-10:53, 224-227)
│   │   │   ├─1 listItem[11] (11:5-11:77, 232-304)
│   │   │   │   │ spread: false
│   │   │   │   │ checked: null
│   │   │   │   ├─0  text "For each " (11:8-11:17, 235-244)
│   │   │   │   ├─1  inlineCode "x" (11:17-11:20, 244-247)
│   │   │   │   ├─2  text " in " (11:20-11:24, 247-251)
│   │   │   │   ├─3  inlineCode "u" (11:24-11:27, 251-254)
│   │   │   │   ├─4  text ", " (11:27-11:29, 254-256)
│   │   │   │   ├─5  inlineCode "y = 2x + 1" (11:29-11:41, 256-268)
│   │   │   │   ├─6  text " and " (11:41-11:46, 268-273)
│   │   │   │   ├─7  inlineCode "z = 3x + 1" (11:46-11:58, 273-285)
│   │   │   │   ├─8  text " must be in " (11:58-11:70, 285-297)
│   │   │   │   ├─9  inlineCode "u" (11:70-11:73, 297-300)
│   │   │   │   └─10 text " too" (11:73-11:77, 300-304)
│   │   │   └─2 listItem[2] (12:5-12:41, 309-345)
│   │   │       │ spread: false
│   │   │       │ checked: null
│   │   │       ├─0 text "There are no other numbers in " (12:8-12:38, 312-342)
│   │   │       └─1 inlineCode "u" (12:38-12:41, 342-345)
│   │   ├─4 break (12:41-13:1, 345-346)
│   │   ├─5 break (13:3-14:1, 348-349)
│   │   │     data: {"blank":true}
│   │   └─6 paragraph[5] (14:4-14:68, 352-416)
│   │       ├─0 text "Given an index, " (14:4-14:20, 352-368)
│   │       ├─1 inlineCode "n" (14:20-14:23, 368-371)
│   │       ├─2 text ", the function returns the element at " (14:23-14:61, 371-409)
│   │       ├─3 inlineCode "u(n)" (14:61-14:67, 409-415)
│   │       └─4 text "." (14:67-14:68, 415-416)
│   ├─1 blockTag<@example>[1] (16:4-17:28, 423-459)
│   │   └─0 code "await dblLinear(0) // 1" (17:5-17:28, 436-459)
│   │         lang: null
│   │         meta: null
│   ├─2 blockTag<@example>[1] (18:4-19:30, 463-501)
│   │   └─0 code "await dblLinear(10) // 22" (19:5-19:30, 476-501)
│   │         lang: null
│   │         meta: null
│   ├─3 blockTag<@example>[1] (20:4-21:32, 505-545)
│   │   └─0 code "await dblLinear(100) // 447" (21:5-21:32, 518-545)
│   │         lang: null
│   │         meta: null
│   ├─4 blockTag<@example>[1] (22:4-23:36, 549-593)
│   │   └─0 code "await dblLinear(7687) // 111718" (23:5-23:36, 562-593)
│   │         lang: null
│   │         meta: null
│   ├─5 blockTag<@param>[2] (25:4-25:46, 600-642)
│   │   ├─0 typeExpression "number" (25:11-25:19, 607-615)
│   │   └─1 text "n - Sequence element index" (25:20-25:46, 616-642)
│   └─6 blockTag<@return>[3] (26:4-26:38, 646-680)
│       ├─0 typeExpression "number" (26:12-26:20, 654-662)
│       ├─1 text "Element at " (26:21-26:32, 663-674)
│       └─2 inlineCode "u(n)" (26:32-26:38, 674-680)
├─2 comment[2] (29:3-33:6, 727-781)
│   ├─0 description[1] (30:6-30:15, 736-745)
│   │   └─0 paragraph[1] (30:6-30:15, 736-745)
│   │       └─0 text "Sequence." (30:6-30:15, 736-745)
│   └─1 blockTag<@const>[2] (32:6-33:1, 756-776)
│       ├─0 typeExpression "number[]" (32:13-32:23, 763-773)
│       └─1 text "u" (32:24-32:25, 774-775)
├─3 comment[2] (36:3-40:6, 811-900)
│   ├─0 description[1] (37:6-37:54, 820-868)
│   │   └─0 paragraph[3] (37:6-37:54, 820-868)
│   │       ├─0 text "Index of x in " (37:6-37:20, 820-834)
│   │       ├─1 inlineTag<@linkcode> "u" (37:20-37:33, 834-847)
│   │       └─2 text " used to calculate y." (37:33-37:54, 847-868)
│   └─1 blockTag<@var>[2] (39:6-40:1, 879-895)
│       ├─0 typeExpression "number" (39:11-39:19, 884-892)
│       └─1 text "j" (39:20-39:21, 893-894)
├─4 comment[2] (43:3-47:6, 924-1013)
│   ├─0 description[1] (44:6-44:54, 933-981)
│   │   └─0 paragraph[3] (44:6-44:54, 933-981)
│   │       ├─0 text "Index of x in " (44:6-44:20, 933-947)
│   │       ├─1 inlineTag<@linkcode> "u" (44:20-44:33, 947-960)
│   │       └─2 text " used to calculate z." (44:33-44:54, 960-981)
│   └─1 blockTag<@var>[2] (46:6-47:1, 992-1008)
│       ├─0 typeExpression "number" (46:11-46:19, 997-1005)
│       └─1 text "j" (46:20-46:21, 1006-1007)
├─5 comment[2] (52:5-56:8, 1118-1173)
│   ├─0 description[1] (53:8-53:12, 1129-1133)
│   │   └─0 paragraph[2] (53:8-53:12, 1129-1133)
│   │       ├─0 inlineCode "y" (53:8-53:11, 1129-1132)
│   │       └─1 text "." (53:11-53:12, 1132-1133)
│   └─1 blockTag<@const>[2] (55:8-56:1, 1148-1166)
│       ├─0 typeExpression "number" (55:15-55:23, 1155-1163)
│       └─1 text "y" (55:24-55:25, 1164-1165)
└─6 comment[2] (59:5-63:8, 1215-1270)
    ├─0 description[1] (60:8-60:12, 1226-1230)
    │   └─0 paragraph[2] (60:8-60:12, 1226-1230)
    │       ├─0 inlineCode "z" (60:8-60:11, 1226-1229)
    │       └─1 text "." (60:11-60:12, 1229-1230)
    └─1 blockTag<@const>[2] (62:8-63:1, 1245-1263)
        ├─0 typeExpression "number" (62:15-62:23, 1252-1260)
        └─1 text "z" (62:24-62:25, 1261-1262)
```

## API

This package exports the identifiers
[`inspect`](#inspecttree-options),
[`inspectColor`](#inspectcolortree-options),
and [`inspectNoColor`](#inspectnocolortree-options).

There is no default export.

### `inspect(tree[, options])`

Inspect a tree, with color in Node, without color in browsers.

#### Parameters

- `tree` (`unknown`)
  — tree to inspect
- `options` ([`Options`](#options) | `null` | `undefined`)
  — configuration options

#### Returns

(`string`) Pretty printed `tree`.

### `inspectColor(tree[, options])`

Inspect a tree, with color.

Otherwise the same as [`inspect`](#inspecttree-options).

### `inspectNoColor(tree[, options])`

Inspect a tree, without color.

Otherwise the same as [`inspect`](#inspecttree-options).

### `Options`

Configuration options (TypeScript type).

#### Fields

- `positions?` (`boolean | null | undefined`)
  — include positional information
  - **default**: `true`

## Types

This package is fully typed with [TypeScript][].

## Contribute

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

This project has a [code of conduct](CODE_OF_CONDUCT.md). By interacting with this repository, organization, or
community you agree to abide by its terms.

[bun]: https://bun.sh

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[tree]: https://github.com/syntax-tree/unist#tree

[typescript]: https://www.typescriptlang.org

[unist]: https://github.com/syntax-tree/unist

[yarn]: https://yarnpkg.com
