import { useMemo } from '@wordpress/element';

import { Attributes } from './types';

/**
 * @param attributes The audio block attributes.
 */
export default function useStyle(attributes: Attributes): React.CSSProperties {
	const style = useMemo(
		() => computeStyle(attributes),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[attributes.textColor, attributes.backgroundColor, attributes.style]
	);

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

	return result;
}
