import { registerBlockType, type BlockConfiguration } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { audio as icon } from '@wordpress/icons';

import './style.scss';

import metadata from './block.json';
import edit from './edit';
import save from './save';
import transforms from './transforms';
import type { Props } from './types';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata as BlockConfiguration<Props>, {
	icon,
	edit,
	save,
	title: __('Vinyl Audio', 'vinyl-audio'),
	transforms,
});
