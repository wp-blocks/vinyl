import type { Transform } from '@wordpress/blocks';
import type { Style } from '@wordpress/style-engine/build-types/types';

export interface Attributes {
	caption?: string;
	id?: number;
	loop?: boolean;
	src?: string;
	preload?: string;

	/**
	 * Set by the color block support, if a text color is set.
	 */
	textColor?: string;

	/**
	 * Set by the color block support, if a background color is set.
	 */
	backgroundColor?: string;

	/**
	 * The `--media-range-bar-color` CSS custom property value.
	 */
	trackBarColor?: string;

	/**
	 * The `--media-range-track-background` CSS custom property value.
	 */
	trackBackgroundColor?: string;

	/**
	 * The block's style settings.
	 */
	style?: Style;
}

/**
 * This isn't currently in `@types/wordpress__blocks`
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Transforms<T extends Record<string, any>> {
	/**
	 * Transforms from another block type to this block type.
	 */
	readonly from?: readonly Transform<T>[] | undefined;
	/**
	 * Transforms from this block type to another block type.
	 */
	readonly to?: readonly Transform[] | undefined;
}
