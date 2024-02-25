<?php

use PhpCsFixer\Config;
use PhpCsFixer\Finder;

// The rule set contains rules that are incompatible with the version of
// PHP-CS-Fixer that can be installed in the project because of dependencies
// version conflicts. Using a globally installed version of PHP-CS-Fixer
// allows using the latest version of the rules.

$finder = Finder::create()
	->exclude( [ 'vendor', 'vendor-prod' ] )
	->in( [
		__DIR__ . '/includes',
	] )
	->name( '*.php' )
	->ignoreDotFiles( true )
	->ignoreVCS( true );

$config = new Config();

return $config->setRules( [
	'@PSR12' => true,
	'@PHP82Migration' => true,

	// Indention

	'indentation_type' => true,

	// Array notation

	'array_indentation' => true,
	'array_syntax' => [ 'syntax' => 'short' ],
	'no_multiline_whitespace_around_double_arrow' => false,
	'trim_array_spaces' => false,
	'whitespace_after_comma_in_array' => [ 'ensure_single_space' => false ],

	// Basic

	'single_quote' => true,
	'octal_notation' => true,
	'no_trailing_comma_in_singleline' => true,
	'single_line_empty_body' => true,

	// Class notation

	'class_attributes_separation' => [ 'elements' => [ 'const' => 'one', 'method' => 'one', 'property' => 'one', 'trait_import' => 'none', 'case' => 'none' ] ],
	'no_null_property_initialization' => true,

	// Function notation

	'method_argument_space' => [ 'attribute_placement' => 'ignore', 'keep_multiple_spaces_after_comma' => true, 'on_multiline' => 'ensure_fully_multiline' ],

	// Imports

	'no_unused_imports' => true,

	// Operator

	// 'unary_operator_spaces' => array(
	// 	'only_dec_inc' => true,
	// ),

	// PHPDoc

	'phpdoc_indent' => true,
	'phpdoc_align' => true,
	'phpdoc_separation' => true,

	// White space

	'spaces_inside_parentheses' => [ 'space' => 'single' ],
	'heredoc_indentation' => [ 'indentation' => 'same_as_start' ],
	'method_chaining_indentation' => true,
	'no_extra_blank_lines' => [
		'tokens' => [ 'attribute', 'break', 'case', 'continue', 'curly_brace_block', 'default', 'extra', 'parenthesis_brace_block', 'return', 'square_brace_block', 'switch', 'throw', 'use' ],
	],
	'no_spaces_around_offset' => false,

	'types_spaces' => [ 'space' => 'none' ],

	'braces_position' => [
		'classes_opening_brace' => 'same_line',
		'functions_opening_brace' => 'same_line',
	],
] )
	->setIndent( '	' )
	->setLineEnding( "\n" )
	->setFinder( $finder );
