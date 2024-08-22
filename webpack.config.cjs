const path = require('node:path');

const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');
const [
	scriptConfig,
	moduleConfig,
] = require('@wordpress/scripts/config/webpack.config');

// This config requires `wp-scripts` to be run with the `--experimental-modules` flag.

const webpackConfig = [
	scriptConfig,
	{
		...moduleConfig,
		entry: {
			...moduleConfig.entry(),
			'vinyl-audio-state': path.resolve(
				process.cwd(),
				'assets',
				'js',
				'audio-state.ts'
			),
		},

		resolve: {
			...moduleConfig.resolve,
			extensionAlias: {
				'.js': ['.ts', '.tsx', '.js', '.jsx'],
				'.mjs': ['.mts', '.mjs'],
			},
		},

		externals: {
			'vinyl-audio-state': 'vinyl-audio-state',
		},

		// https://github.com/WordPress/gutenberg/tree/trunk/packages/dependency-extraction-webpack-plugin#behavior-with-script-modules
		// These lines are necessary to enable module compilation at time-of-writing:
		// output: { module: true },
		// experiments: { outputModule: true },

		plugins: [
			...moduleConfig.plugins.filter(
				(plugin) =>
					plugin.constructor.name !==
					'DependencyExtractionWebpackPlugin'
			),
			new DependencyExtractionWebpackPlugin({
				// With modules, use `requestToExternalModule`:
				requestToExternalModule(request) {
					if (request === 'vinyl-audio-state') {
						return request;
					}
				},
			}),
		],
	},
];

module.exports = webpackConfig;
