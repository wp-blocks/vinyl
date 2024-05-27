/**
 * @param {unknown} x The value to check
 *
 * @returns {x is number} Whether the value is a valid number
 */
export function isValidNumber(x) {
	return typeof x === 'number' && !Number.isNaN(x) && Number.isFinite(x);
}
