module.exports = {
	'**/*.(json|yml|yaml)': (filenames) => {
		const files = filenames.join(' ');
		return [`prettier --write ${files}`];
	},
	'**/*.(js|jsx|cjs|mjs|ts|tsx)': (filenames) => {
		const files = filenames.join(' ');
		return [`eslint --ext .js,.jsx,.cjs,.mjs,.ts,.tsx --fix ${files}`];
	},
	'**/*.php': (filenames) => {
		const files = filenames.join(' ');
		return [
			`php ./vendor/bin/php-cs-fixer fix --config=.php-cs-fixer.dist.php ${files}`,
			`php ./vendor/bin/phpstan analyse --configuration=phpstan.neon.dist --memory-limit=4G --no-progress --no-interaction --ansi ${files}`,
		];
	},
};
