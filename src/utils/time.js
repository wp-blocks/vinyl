/**
 * This file is a modified version of the `time.js` file from the `media-chrome`
 * package. The purpose of duplicating this file is to add custom translatable
 * label support to the Vinyl player.
 *
 * The original file can be found at the following link:
 *
 * https://github.com/muxinc/media-chrome/blob/80a4780759c8c2cad2ae815671dac4ac7a92c4ab/src/js/utils/utils.js
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
import { __ } from '@wordpress/i18n';
import { isValidNumber } from 'media-chrome/dist/utils/utils.js';

const UnitLabels = [
	{
		singular: __('hour', 'vinyl'),
		plural: __('hours', 'vinyl'),
	},
	{
		singular: __('minute', 'vinyl'),
		plural: __('minutes', 'vinyl'),
	},
	{
		singular: __('second', 'vinyl'),
		plural: __('seconds', 'vinyl'),
	},
];

const toTimeUnitPhrase = (timeUnitValue, unitIndex) => {
	const unitLabel =
		timeUnitValue === 1
			? UnitLabels[unitIndex].singular
			: UnitLabels[unitIndex].plural;

	return `${timeUnitValue} ${unitLabel}`;
};

/**
 * This function converts numeric seconds into a phrase
 * @param {number} seconds - a (positive or negative) time, represented as seconds
 * @returns {string} The time, represented as a phrase of hours, minutes, and seconds
 */
export const formatAsTimePhrase = (seconds) => {
	if (!isValidNumber(seconds)) return '';
	const positiveSeconds = Math.abs(seconds);
	const negative = positiveSeconds !== seconds;
	const secondsDateTime = new Date(0, 0, 0, 0, 0, positiveSeconds, 0);
	const timeParts = [
		secondsDateTime.getHours(),
		secondsDateTime.getMinutes(),
		secondsDateTime.getSeconds(),
	];
	// NOTE: Everything above should be useable for the `formatTime` function.

	const timeString = timeParts
		// Convert non-0 values to a string of the value plus its unit
		.map(
			(timeUnitValue, index) =>
				timeUnitValue && toTimeUnitPhrase(timeUnitValue, index)
		)
		// Ignore/exclude any 0 values
		.filter((x) => x)
		// join into a single comma-separated string phrase
		.join(', ');

	// If the time was negative, assume it represents some remaining amount of time/"count down".
	const negativeSuffix = negative ? ' remaining' : '';

	return `${timeString}${negativeSuffix}`;
};

/**
 * @description Converts a time, in numeric seconds, to a formatted string representation of the form [HH:[MM:]]SS, where hours and minutes
 * are optional, either based on the value of `seconds` or (optionally) based on the value of `guide`.
 * @param {number} seconds - The total time you'd like formatted, in seconds
 * @param {number} [guide] - A number in seconds that represents how many units you'd want to show. This ensures consistent formatting between e.g. 35s and 4834s.
 * @returns {string} A string representation of the time, with expected units
 */
export function formatTime(seconds, guide) {
	// Handle negative values at the end
	let negative = false;

	if (seconds < 0) {
		negative = true;
		seconds = 0 - seconds;
	}

	seconds = seconds < 0 ? 0 : seconds;
	/** @type {number|string} */
	let s = Math.floor(seconds % 60);
	/** @type {number|string} */
	let m = Math.floor((seconds / 60) % 60);
	/** @type {number|string} */
	let h = Math.floor(seconds / 3600);
	const gm = Math.floor((guide / 60) % 60);
	const gh = Math.floor(guide / 3600);

	// handle invalid times
	if (isNaN(seconds) || seconds === Infinity) {
		// '-' is false for all relational operators (e.g. <, >=) so this setting
		// will add the minimum number of fields specified by the guide
		h = m = s = '0';
	}

	// Check if we need to show hours
	// @ts-expect-error
	h = h > 0 || gh > 0 ? h + ':' : '';

	// If hours are showing, we may need to add a leading zero.
	// Always show at least one digit of minutes.
	// @ts-expect-error
	m = ((h || gm >= 10) && m < 10 ? '0' + m : m) + ':';

	// Check if leading zero is need for seconds
	// @ts-expect-error
	s = s < 10 ? '0' + s : s;

	return (negative ? '-' : '') + h + m + s;
}

/** @type {TimeRanges} */
export const emptyTimeRanges = Object.freeze({
	length: 0,
	start(index) {
		const unsignedIdx = index >>> 0;
		if (unsignedIdx >= this.length) {
			throw new DOMException(
				`Failed to execute 'start' on 'TimeRanges': The index provided (${unsignedIdx}) is greater than or equal to the maximum bound (${this.length}).`
			);
		}
		return 0;
	},
	end(index) {
		const unsignedIdx = index >>> 0;
		if (unsignedIdx >= this.length) {
			throw new DOMException(
				`Failed to execute 'end' on 'TimeRanges': The index provided (${unsignedIdx}) is greater than or equal to the maximum bound (${this.length}).`
			);
		}
		return 0;
	},
});

/**
 * @param {TimeRanges} [timeRanges]
 */
export function serializeTimeRanges(timeRanges = emptyTimeRanges) {
	// @ts-expect-error
	return Array.from(timeRanges)
		.map((_, i) =>
			[
				Number(timeRanges.start(i).toFixed(3)),
				Number(timeRanges.end(i).toFixed(3)),
			].join(':')
		)
		.join(' ');
}
