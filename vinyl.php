<?php
/**
 * Plugin Name:       Vinyl Audio
 * Plugin URI:        https://github.com/wp-blocks/vinyl
 * Description:       An advanced WordPress audio player.
 * Version:           0.1.3
 * Requires at least: 6.3
 * Requires PHP:      7.4
 * Author:            codekraft, bitmachina
 * Author URI:        https://github.com/wp-blocks
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       vinyl
 * Domain Path:       /languages
 *
 * @package           vinyl
 */

if ( !defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( version_compare( phpversion(), '7.4.0', '<' ) ) {
	/**
	 * @return void
	 */
	function vinyl_minimum_php_version_notice() {
		echo '<div class="notice notice-error"><p>' . esc_html__( 'Vinyl Audio requires PHP 7.4 or higher.', 'vinyl' ) . '</p></div>';
	}

	add_action( 'admin_notices', 'vinyl_minimum_php_version_notice' );

	return;
}

if ( version_compare( $GLOBALS['wp_version'], '6.2', '<' ) ) {
	/**
	 * @return void
	 */
	function vinyl_minimum_wp_version_notice() {
		echo '<div class="notice notice-error"><p>' . esc_html__( 'Vinyl Audio requires WordPress 6.2 or later.', 'vinyl' ) . '</p></div>';
	}

	add_action( 'admin_notices', 'vinyl_minimum_wp_version_notice' );

	return;
}

if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
	require_once( __DIR__ . '/vendor/autoload.php' );
}

/**
 * Start the Vinyl audio plugin.
 */
WpBlocks\Vinyl\Core::get_instance()->boot( __FILE__ );
