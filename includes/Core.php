<?php
/**
 * Core class for the plugin.
 *
 * @package WpBlocks\Vinyl
 */

namespace WpBlocks\Vinyl;

/**
 * Core Vinyl Audio class.
 *
 * @property-read string $plugin_dir
 * @property-read string $plugin_file
 * @property-read string $plugin_url
 */
final class Core {
	/**
	 * @var Core|null
	 */
	private static $instance;

	/**
	 * @var string|null
	 */
	public $plugin_dir;

	/**
	 * @var string|null
	 */
	public $plugin_file;

	/**
	 * The plugin URL with trailing slash.
	 * s
	 *
	 * @var string|null
	 */
	public $plugin_url;

	/**
	 * Private constructor to make this a singleton
	 *
	 * @access private
	 */
	private function __construct() {}

	/**
	 * Function to instantiate our class and make it a singleton
	 *
	 * @return Core
	 */
	public static function get_instance() {
		if ( self::$instance === null ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * @param string $plugin_file
	 *
	 * @return void
	 */
	public function boot( $plugin_file ) {
		$this->setup_paths( $plugin_file );

		add_action( 'plugins_loaded', [ $this, 'load' ] );
		add_action( 'init', [ $this, 'init' ] );
	}

	/**
	 * The `init` action callback.
	 *
	 * @return void
	 */
	public function init() {
		$this->register_blocks();

		add_action( 'enqueue_block_assets', [ $this, 'enqueue_block_assets' ] );
	}

	/**
	 * The `plugins_loaded` action callback.
	 *
	 * @return void
	 */
	public function load() {
		// TODO Load the plugin text domain.
	}

	/**
	 * @return void
	 */
	public function register_blocks() {
		/**
		 * Registers the block using the metadata loaded from the `block.json` file.
		 * Behind the scenes, it registers also all assets so they can be enqueued
		 * through the block editor in the corresponding context.
		 *
		 * @see https://developer.wordpress.org/reference/functions/register_block_type/
		 */
		register_block_type( $this->plugin_dir . 'build/audio/block.json' );
	}

	/**
	 * Enqueue the block assets for the editor.
	 *
	 * The editor loads in an iframe. Normal block assets are not enqueued in the
	 * iframe by default. This function enqueues the assets in the iframe. The
	 * `media-chrome` scripts have to be loaded this way, otherwise it will not be
	 * able to hydrate the web component player in the editor.
	 *
	 * https://github.com/WordPress/gutenberg/issues/47924#issuecomment-1683815920
	 *
	 * @return void
	 */
	public function enqueue_block_assets() {
		// Check this for how to load the `asset.php` file.
		// https://developer.wordpress.org/reference/functions/register_block_script_handle/
		$script_asset_path = $this->plugin_dir . 'build/media-chrome.asset.php';
		$script_asset      = require $script_asset_path;
		$script_dependencies = $script_asset['dependencies'] ?? [];

		wp_enqueue_script(
			'vinyl_audio_media_chrome',
			$this->plugin_url . 'build/media-chrome.js',
			$script_dependencies,
			$script_asset['version'] ?? false
		);
	}

	/**
	 * Setup the paths used throughout the plugin.
	 *
	 * @param string $plugin_file
	 *
	 * @return void
	 */
	private function setup_paths( $plugin_file ) {
		$this->plugin_file = $plugin_file;
		$this->plugin_dir  = plugin_dir_path( $plugin_file );
		$this->plugin_url  = plugin_dir_url( $plugin_file );
	}
}
