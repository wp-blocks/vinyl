import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { audio as icon } from '@wordpress/icons';

import './style.css';

import metadata from './block.json';
import Edit from './edit';

registerBlockType(metadata, {
	icon,
	edit: Edit,
	save: () => null,
	title: __('Vinyl Audio Source', 'vinyl'),
});
