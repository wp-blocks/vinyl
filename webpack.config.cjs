const path = require('node:path');

const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = {
	...defaultConfig,
	entry: {
		...defaultConfig.entry(),
		'media-chrome': path.resolve(process.cwd(), 'src', 'media-chrome'),
	},
	resolve: {
		...defaultConfig.resolve,
		extensionAlias: {
			'.js': ['.ts', '.tsx', '.js', '.jsx'],
			'.mjs': ['.mts', '.mjs'],
		},
	},
};
