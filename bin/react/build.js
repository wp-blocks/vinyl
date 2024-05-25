/* eslint-disable no-console */

/**
 * This file is a modified version of the `scripts/react/builds.js` file from
 * the `media-chrome` package.
 *
 * The original file can be found at the following link:
 *
 * https://github.com/muxinc/media-chrome/blob/692be61a2a63ba98c7e449d860ce1828b78353a2/scripts/react/build.js
 */

/**
 * Copyright (c) 2020 Mux, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Notes about the current implementation of the React wrapper compiler:
// Currently relies on a build having already been generated.
// Outputs (uncompiled) ES Modules to the dist dir
// Does not currently support "extras" components

// REACT MODULE STRING CREATION CODE BEGIN
const clearAndUpper = (kebabText) => {
	return kebabText.replace(/-/, '').toUpperCase();
};

const toPascalCase = (kebabText) => {
	return kebabText.replace(/(^\w|-\w)/g, clearAndUpper);
};

const toImportsStr = ({ importPath }) => {
	return `/* eslint-disable */
// @ts-nocheck

import React from "react";
import "${importPath}";
import { toNativeProps } from "./common/utils.js";
`;
};

const toReactComponentStr = (config) => {
	const { elementName } = config;
	const ReactComponentName = toPascalCase(elementName);
	return `/** @type { import("react").HTMLElement } */
const ${ReactComponentName} = React.forwardRef(({ children = [], ...props }, ref) => {
  return React.createElement('${elementName}', toNativeProps({ ...props, suppressHydrationWarning: true, ref }), children);
});`;
};

const toExportsStr = (config) => {
	const { elementName } = config;
	const ReactComponentName = toPascalCase(elementName);
	return `export { ${ReactComponentName} };`;
};

const toCustomElementReactWrapperModule = (config) => {
	const moduleStr = `${toReactComponentStr(config)}

${toExportsStr(config)}
`;

	return moduleStr;
};
// REACT MODULE STRING CREATION CODE END

// TYPESCRIPT DECLARATION FILE STRING CREATION CODE BEGIN
const toTypeImportsAndGenericDefinitionsStr = () => {
	return `/* eslint-disable */
// @ts-nocheck

import type React from 'react';

import type * as CSS from 'csstype';
declare global {
  interface Element {
    slot?: string;
  }
}

declare module 'csstype' {
  interface Properties {
    // Should add generic support for any CSS variables
    [index: \`--\${string}\`]: any;
  }
}

type GenericProps = { [k: string]: any };
type GenericElement = HTMLElement;

type GenericForwardRef = React.ForwardRefExoticComponent<
  GenericProps & React.RefAttributes<GenericElement | undefined>
>;
`;
};

const toDeclarationStr = (config) => {
	const { elementName } = config;
	const ReactComponentName = toPascalCase(elementName);
	return `declare const ${ReactComponentName}: GenericForwardRef;`;
};

const toCustomElementReactTypeDeclaration = (config) => {
	const typeDeclarationStr = `${toDeclarationStr(config)}
${toExportsStr(config)}
`;

	return typeDeclarationStr;
};
// TYPESCRIPT DECLARATION FILE STRING CREATION CODE END

// BUILD BEGIN

const entryPointsToReactModulesIterable = (
	entryPoints,
	{ getDefinedCustomElements, distRoot }
) => {
	let alreadyDefinedCustomElementNames = [];
	return {
		[Symbol.asyncIterator]() {
			return {
				i: 0,
				next() {
					const { i } = this;
					if (i >= entryPoints.length)
						return Promise.resolve({ done: true });

					const importPath = entryPoints[i];
					const importPathAbs = require.resolve(importPath);
					const importPathObj = path.parse(importPathAbs);
					// Remove `-element` suffix for React modules
					const name = importPathObj.name.replace(/-element$/, '');
					const modulePathAbs = path.format({
						dir: distRoot,
						name,
						ext: '.js',
					});
					const tsDeclPathAbs = path.format({
						dir: distRoot,
						name,
						ext: '.d.ts',
					});

					const importPathRelative = path.relative(
						distRoot,
						importPathAbs
					);
					return import(importPath)
						.then((_) => {
							const customElementNames =
								getDefinedCustomElements().filter(
									(customElementName) =>
										customElementName.startsWith('vinyl-')
								);

							const undefinedCustomElementNames =
								customElementNames.filter(
									/* eslint-disable-next-line no-shadow */
									(name) =>
										!alreadyDefinedCustomElementNames.includes(
											name
										)
								);

							const componentsWithExports =
								undefinedCustomElementNames.map(
									(elementName) => {
										return toCustomElementReactWrapperModule(
											{
												elementName,
											}
										);
									}
								);

							const moduleStr = `${toImportsStr({
								importPath: importPathRelative,
							})}\n${componentsWithExports.join('\n')}`;

							fs.writeFileSync(modulePathAbs, moduleStr);

							const declarationsWithExports =
								undefinedCustomElementNames.map(
									(elementName) => {
										return toCustomElementReactTypeDeclaration(
											{ elementName }
										);
									}
								);

							const tsDeclStr = `${toTypeImportsAndGenericDefinitionsStr()}\n${declarationsWithExports.join(
								'\n'
							)}`;

							fs.writeFileSync(tsDeclPathAbs, tsDeclStr);

							alreadyDefinedCustomElementNames = [
								...customElementNames,
							];

							return {
								modulePath: modulePathAbs,
								moduleContents: moduleStr,
								tsDeclarationPath: tsDeclPathAbs,
								tsDeclarationContents: tsDeclStr,
							};
						})
						.then((moduleDef) => {
							this.i++;
							return { value: moduleDef, done: false };
						})
						.catch((err) => {
							return Promise.reject({ value: err });
						});
				},
			};
		},
	};
};

const createReactWrapperModules = ({
	entryPoints,
	setupGlobalsAsync,
	distRoot = './',
	commonModulesSrcRoot = path.join(__dirname, 'common'),
}) => {
	return setupGlobalsAsync().then(async (customElementNames) => {
		if (!entryPoints?.length) {
			console.error('no entrypoints! bailing');
			return;
		}

		fs.mkdirSync(distRoot, { recursive: true });

		const commonModulesDistPath = path.join(distRoot, 'common');
		fs.mkdirSync(commonModulesDistPath, { recursive: true });
		fs.readdirSync(commonModulesSrcRoot, { withFileTypes: true }).forEach(
			(dirEntryObj) => {
				const { name } = dirEntryObj;
				fs.copyFileSync(
					path.format({ name, dir: commonModulesSrcRoot }),
					path.format({ name, dir: commonModulesDistPath })
				);
			}
		);

		const moduleCreateAsyncIterable = entryPointsToReactModulesIterable(
			entryPoints,
			{ getDefinedCustomElements: () => customElementNames, distRoot }
		);

		try {
			for await (const moduleDef of moduleCreateAsyncIterable) {
				const { modulePath, moduleContents } = moduleDef;
				console.log(
					'React module wrapper created!',
					'path (absolute):',
					modulePath
					// '\n',
					// 'contents:',
					// moduleContents
				);
			}
		} catch (err) {
			console.log('unexpected error generating module!', err);
		}

		console.log('module generation completed!');
	});
};

export { toCustomElementReactWrapperModule };
// BUILD END

// EXTERNALIZEABLE/CONFIG CODE BEGIN
const projectRoot = path.join(__dirname, '..', '..');
const distRoot = path.join(projectRoot, 'src', 'react');
const entryPoints = [
	path.join(projectRoot, 'src', 'web-components', 'index.js'),
];
const setupGlobalsAsync = async () => {
	const customElementNames = await import(
		path.join(projectRoot, 'src', 'utils', 'server-safe-globals.js')
	).then((exports) => {
		Object.assign(globalThis, exports.globalThis);
		globalThis.customElementNames = [];
		globalThis.customElements.define = (name, _classRef) =>
			globalThis.customElementNames.push(name);
		// NOTE: The current implementation relies on the fact that `customElementNames` will be mutated
		// to add the Custom Element html name for every element that's defined as a result of loading/importing the entryPoints modules (CJP).
		return globalThis.customElementNames;
	});
	return customElementNames;
};

createReactWrapperModules({ entryPoints, setupGlobalsAsync, distRoot });
// EXTERNALIZEABLE/CONFIG CODE END
