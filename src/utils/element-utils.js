/**
 * @param {any}    svg      Should be an SVGElement, but need any for SSR cases
 * @param {string} value
 * @param {string} selector
 */
export const updateIconText = (svg, value, selector = '.value') => {
	const node = svg.querySelector(selector);

	if (!node) return;

	node.textContent = value;
};

/**
 *
 * @param {any}    el   Should be an HTMLElement, but need any for SSR cases
 * @param {string} name
 */
export const getAllSlotted = (el, name) => {
	const slotSelector = `slot[name="${name}"]`;
	const slot = el.shadowRoot.querySelector(slotSelector);
	if (!slot) return [];
	return slot.children;
};

export const getSlotted = (el, name) => getAllSlotted(el, name)[0];

/**
 * Gets the number represented by the attribute
 * @param {any}    el                          Should be an HTMLElement, but need any for SSR cases
 * @param {string} attrName
 * @param {number} [defaultValue = Number.NaN]
 *
 * @returns {number | undefined} Will return undefined if no attribute set
 */
export function getNumericAttr(el, attrName, defaultValue = Number.NaN) {
	const attrVal = el.getAttribute(attrName);
	return attrVal !== null ? +attrVal : defaultValue;
}

/**
 * @param {any}                       el       (Should be an HTMLElement, but need any for SSR cases)
 * @param {string}                    attrName
 * @param {number | null | undefined} value
 */
export function setNumericAttr(el, attrName, value) {
	// Simple cast to number
	const nextNumericValue = Number(value);

	// Treat null, undefined, and NaN as "nothing values", so unset if value is currently set.
	if (value === null || Number.isNaN(nextNumericValue)) {
		if (el.hasAttribute(attrName)) {
			el.removeAttribute(attrName);
		}
		return;
	}

	// Avoid resetting a value that hasn't changed
	if (getNumericAttr(el, attrName, undefined) === nextNumericValue) return;

	el.setAttribute(attrName, `${nextNumericValue}`);
}
