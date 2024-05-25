import { __, _n, sprintf } from '@wordpress/i18n';

export default function createLabels() {
	const nouns = {
		AUDIO_PLAYER: () => __('audio player', 'vinyl'),
		VIDEO_PLAYER: () => __('video player', 'vinyl'),
		VOLUME: () => __('volume', 'vinyl'),
		SEEK: () => __('seek', 'vinyl'),
		CLOSED_CAPTIONS: () => __('closed captions', 'vinyl'),
		PLAYBACK_RATE: ({ playbackRate = 1 } = {}) =>
			/* translators: ratio in the format of 1.0x, 1.5x, 2.0x etc. */
			sprintf('current playback rate %s', playbackRate),
		PLAYBACK_TIME: () => __('playback time', 'vinyl'),
		MEDIA_LOADING: () => __('media loading', 'vinyl'),
		SETTINGS: () => __('settings', 'vinyl'),
		AUDIO_TRACKS: () => __('audio tracks', 'vinyl'),
		QUALITY: () => __('quality', 'vinyl'),
	};

	const verbs = {
		PLAY: () => __('play', 'vinyl'),
		PAUSE: () => __('pause', 'vinyl'),
		MUTE: () => __('mute', 'vinyl'),
		UNMUTE: () => __('unmute', 'vinyl'),
		ENTER_AIRPLAY: () => __('start airplay', 'vinyl'),
		EXIT_AIRPLAY: () => __('stop airplay', 'vinyl'),
		ENTER_CAST: () => __('start casting', 'vinyl'),
		EXIT_CAST: () => __('stop casting', 'vinyl'),
		ENTER_FULLSCREEN: () => __('enter fullscreen mode', 'vinyl'),
		EXIT_FULLSCREEN: () => __('exit fullscreen mode', 'vinyl'),
		ENTER_PIP: () => __('enter picture in picture mode', 'vinyl'),
		EXIT_PIP: () => __('exit picture in picture mode', 'vinyl'),
		SEEK_FORWARD_N_SECS: ({ seekOffset = 30 } = {}) =>
			sprintf(
				/* translators: number of seconds to seek forward. */
				_n(
					'seek forward %s second',
					'seek forward %s seconds',
					seekOffset,
					'vinyl'
				),
				seekOffset
			),
		SEEK_BACK_N_SECS: ({ seekOffset = 30 } = {}) =>
			sprintf(
				/* translators: number of seconds to seek backward. */
				_n(
					'seek back %s second',
					'seek back %s seconds',
					seekOffset,
					'vinyl'
				),
				seekOffset
			),
		SEEK_LIVE: () => __('seek to live', 'vinyl'),
		PLAYING_LIVE: () => __('playing live', 'vinyl'),
	};

	return {
		nouns,
		verbs,
	};
}
