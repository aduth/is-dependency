const { readFileSync } = require('fs');
const { join } = require('path');

/**
 * @typedef Options
 *
 * @prop {string[]} fields Fields to check in `package.json`.
 */

/** @type {Options} */
const DEFAULT_OPTIONS = {
	fields: ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies'],
};

/** @type {Record<string, string>} */
let cache;

/**
 * Returns true if the given package name or array of names are all defined as dependency's in the
 * current working directory's relative `package.json`.
 *
 * Optionally, pass an object of options to control the behavior.
 *
 * @param {string|string[]} nameOrNames Name or names of packages to check.
 * @param {Partial<Options>=} options Options to control discovery behavior.
 *
 * @return {boolean} Whether packages are defined as dependencies.
 */
function isDependency(nameOrNames, options) {
	const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
	const names = Array.isArray(nameOrNames) ? nameOrNames : [nameOrNames];

	if (!cache) {
		cache = Object.create(null);
		try {
			const pkg = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf-8'));
			mergedOptions.fields.forEach((field) => Object.assign(cache, pkg[field]));
		} catch {}
	}

	return names.every((name) => cache[name]);
}

module.exports = { isDependency };
