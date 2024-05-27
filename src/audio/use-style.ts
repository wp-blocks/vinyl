import { useMemo } from '@wordpress/element';

import { Attributes } from './types';

/**
 * @param attributes The audio block attributes.
 */
export default function useStyle(attributes: Attributes): React.CSSProperties {
	const style = useMemo(() => computeStyle(attributes), [attributes]);

	return style;
}

export function computeStyle(attributes: Attributes) {
	const result: React.CSSProperties = {};

	if (attributes.backgroundColor) {
		result['--vinyl-background-color'] =
			`var(--wp--preset--color--${attributes.backgroundColor})`;
	} else if (attributes.style?.color?.background) {
		result['--vinyl-background-color'] = attributes.style.color.background;
	}

	if (attributes.textColor) {
		result['--vinyl-text-color'] =
			`var(--wp--preset--color--${attributes.textColor})`;
	} else if (attributes.style?.color?.text) {
		result['--vinyl-text-color'] = attributes.style.color.text;
	}

	if (attributes.trackBarColor) {
		if (isColorValue(attributes.trackBarColor)) {
			result['--vinyl-track-bar-color'] = attributes.trackBarColor;
		} else {
			result['--vinyl-track-bar-color'] =
				`var(--wp--preset--color--${attributes.trackBarColor})`;
		}
	}

	if (attributes.trackBackgroundColor) {
		if (isColorValue(attributes.trackBackgroundColor)) {
			result['--vinyl-track-background-color'] =
				attributes.trackBackgroundColor;
		} else {
			result['--vinyl-track-background-color'] =
				`var(--wp--preset--color--${attributes.trackBackgroundColor})`;
		}
	}

	return result;
}

function isColorValue(value: string) {
	return /^#[0-9a-f]{3,6}$/i.test(value);
}
