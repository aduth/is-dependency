# `@aduth/is-dependency`

A utility to quickly determine if the given package(s) are dependencies within the current working directory.

This implementation optimizes speed over accuracy, synchronously returning true if the package is defined as a dependency in the current directory's `package.json`, regardless of whether it's actually installed.

## Installation

Install using npm:

```
npm install @aduth/is-dependency
```

## Usage

Pass a name or array of names of dependencies and receive a boolean value in return.

```js
import { isDependency } from '@aduth/is-dependency';

isDependency('@aduth/is-dependency');
// true
```

## API

### `isDependency`

Returns true if the given package name or array of names are all defined as dependency's in the current working directory's relative `package.json`.

Optionally, pass an object of options to control the behavior.

```ts
export type Options = {
	/**
	 * Fields to check in `package.json`.
	 */
	fields: string[];
};

export function isDependency(
	nameOrNames: string | string[],
	options?: Partial<Options> | undefined
): boolean;
```

## License

Copyright 2021 Andrew Duthie

Released under the [MIT License](https://github.com/aduth/is-dependency/tree/master/LICENSE.md).
