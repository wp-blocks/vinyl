<?php
/**
 * Server rendering for the audio player block.
 *
 * @package vinyl
 */

$wrapper_attributes = get_block_wrapper_attributes(
	[ 'class' => 'vinyl__audio-player' ]
);

wp_interactivity_state(
	'vinyl',
	[
		'currentAudio' => '',
		'isPlaying'    => false,
	],
);
?>

<div
	<?php echo $wrapper_attributes; ?>
	data-wp-interactive="vinyl"
	data-wp-init--player="callbacks.init"
>
	<div class="vinyl__player-wrapper">
		<audio id="vinyl-audio-player" class="vinyl__player-audio--destination" />

		Audio Player
	</div>
</div>
