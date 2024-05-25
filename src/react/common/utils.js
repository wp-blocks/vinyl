/* eslint-disable */
// @ts-nocheck

/**
 * This file is a modified version of the `scripts/react/common/utils.js` file
 * from the `media-chrome` package.
 *
 * The original file can be found at the following link:
 *
 * https://github.com/muxinc/media-chrome/blob/692be61a2a63ba98c7e449d860ce1828b78353a2/scripts/react/common/utils.js
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

const ReactPropToAttrNameMap = {
	className: 'class',
	classname: 'class',
	htmlFor: 'for',
	crossOrigin: 'crossorigin',
	viewBox: 'viewBox',
};

export const toNativeAttrName = (propName, propValue) => {
	if (ReactPropToAttrNameMap[propName])
		return ReactPropToAttrNameMap[propName];
	if (typeof propValue === undefined) return undefined;
	if (typeof propValue === 'boolean' && !propValue) return undefined;
	if (/[A-Z]/.test(propName)) return propName.toLowerCase();
	return propName;
};

export const toNativeAttrValue = (propValue, _propName) => {
	if (typeof propValue === 'boolean') return '';
	if (Array.isArray(propValue)) return propValue.join(' ');
	return propValue;
};

export const toNativeProps = (props = {}) => {
	return Object.entries(props).reduce(
		(transformedProps, [propName, propValue]) => {
			const attrName = toNativeAttrName(propName, propValue);

			// prop was stripped. Don't add.
			if (!attrName) {
				return transformedProps;
			}

			const attrValue = toNativeAttrValue(propValue, propName);
			transformedProps[attrName] = attrValue;
			return transformedProps;
		},
		{}
	);
};
