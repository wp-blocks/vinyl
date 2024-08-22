<?php
/**
 * Server rendering for the movie trailer button block.
 *
 * @package vinyl
 */

/** @var array<string,mixed> $attributes */

/** @var string $src */
$wrapper_attributes = get_block_wrapper_attributes(
	[ 'class' => 'vinyl__audio-source' ]
);

/** @var int $post_id */
$post_id = $attributes['id'];

$src = null;

if ( $post_id ) {
	$src = wp_get_attachment_url( $post_id );
}

if ( !$src ) {
	$src = $attributes['src'];
}

if ( !is_string( $src ) ) {
	return;
}

$play_icon = file_get_contents( get_template_directory() . '/assets/play.svg' );

$context = [ 'audioSrc' => $src ];

?>
<div
	data-wp-interactive="vinyl"
	<?php echo $wrapper_attributes; ?>
	<?php echo wp_interactivity_data_wp_context( $context ); ?>
>
	<button
		class="vinyl__audio-play-button"
		data-wp-on--click="actions.setAudio"
		aria-controls="vinyl-audio-player"
	>
		<?php echo $play_icon; ?>

		<span>Play audio</span>
	</button>

	<audio
		slot="media"
		src="<?php echo esc_url( $src ); ?>"
	/>
</div>
