import { registerBlockType, type BlockConfiguration } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { audio as icon } from '@wordpress/icons';

import './style.scss';

import metadata from './block.json';
import edit from './edit.js';
import save from './save.js';
import transforms from './transforms.js';
import type { Attributes } from './types';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata as BlockConfiguration<Attributes>, {
	icon,
	edit,
	save,
	title: __('Vinyl Audio', 'vinyl'),
	transforms,
});
