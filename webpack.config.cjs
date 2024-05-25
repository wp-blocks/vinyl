const path = require('node:path');

const defaultConfig = require('@wordpress/scripts/config/webpack.config');
// const webpack = require('webpack');

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
	// plugins: [
	// 	...defaultConfig.plugins,
	// 	new webpack.NormalModuleReplacementPlugin(
	// 		new RegExp(/^\..+\.js$/),
	// 		function (resource) {
	// 			resource.request = resource.request.replace(
	// 				new RegExp(/\.js$/),
	// 				''
	// 			);
	// 		}
	// 	),
	// ],
};
