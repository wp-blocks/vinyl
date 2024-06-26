module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
		project: ['./tsconfig.eslint.json', './tsconfig.json'],
	},
	extends: [
		'plugin:@wordpress/eslint-plugin/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:@typescript-eslint/strict',
		'plugin:import/recommended',
		'plugin:import/typescript',
	],
	plugins: ['@typescript-eslint'],
	rules: {
		'import/order': [
			'error',
			{
				alphabetize: {
					order: 'asc',
					caseInsensitive: true,
				},
				'newlines-between': 'always',
				groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
				pathGroups: [
					{
						pattern: '@wordpress/**',
						group: 'external',
					},
				],
				pathGroupsExcludedImportTypes: ['builtin'],
			},
		],

		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: false,
				optionalDependencies: false,
				peerDependencies: false,
				// This is pretty dumb
				packageDir: ['./'],
			},
		],

		'jsdoc/require-param': 'off',
		'jsdoc/check-tag-names': [
			'error',
			{
				definedTags: ['attr', 'csspart', 'cssproperty', 'slot'],
			},
		],

		// Enable these once Gutenberg types are figured out.
		'@typescript-eslint/no-unsafe-argument': 'off',
		'@typescript-eslint/no-unsafe-assignment': 'off',
		'@typescript-eslint/no-unsafe-call': 'off',
		'@typescript-eslint/no-unsafe-member-access': 'off',
		'@typescript-eslint/no-unsafe-return': 'off',
		'@typescript-eslint/no-explicit-any': 'off',

		// This might be a bad idea...
		'@wordpress/no-unsafe-wp-apis': 'off',
	},
	overrides: [
		{
			files: 'tests/**/*',
			rules: {
				'@typescript-eslint/no-unsafe-call': 'off',
			},
		},
		{
			files: ['*.js', '*.cjs'],
			rules: {
				'@typescript-eslint/no-var-requires': 'off',
				'@typescript-eslint/no-unsafe-call': 'off',
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/no-unsafe-member-access': 'off',
				'@typescript-eslint/restrict-template-expressions': 'off',
			},
		},
	],
	settings: {
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true,
				project: ['./tsconfig.json'],
			},
		},
		jsdoc: {
			tagNamePreference: {
				// Override `@wordpress/eslint-plugin/recommended`
				returns: 'returns',
			},
		},
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	globals: {
		globalThis: 'writable',
	},
};
