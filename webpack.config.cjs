const path = require('path');

const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = {
	...defaultConfig,
	entry: {
		...defaultConfig.entry(),
		'media-chrome': path.resolve(
			process.cwd(),
			'src',
			'audio',
			'media-chrome'
		),
	},
};
