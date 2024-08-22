/**
 * WordPress dependencies.
 */

import {
	store,
	getContext,
	getElement,
	withScope,
} from '@wordpress/interactivity';

/**
 * Internal dependencies.
 */

import { VinylBlockContext } from './types';

const { actions, state } = store('vinyl/audio', {
	state: {
		/**
		 * The destination audio element.
		 */
		audioElement: null as HTMLAudioElement | null,

		/**
		 * The duration of the current audio.
		 */
		duration: null as number | null,

		/**
		 * The URL of the current audio.
		 */
		currentAudio: null as string | null,

		/**
		 * Whether the audio is playing.
		 */
		isPlaying: false,

		/**
		 * Whether the audio source is playing.
		 */
		get isAudioSourcePlaying(): boolean {
			const ctx = getContext<VinylBlockContext>();
			return state.currentAudio === ctx.audioSrc && state.isPlaying;
		},
	},

	callbacks: {
		init: () => {
			if (state.audioElement) {
				return;
			}

			const { ref } = getElement();

			if (!ref) {
				return;
			}

			const audio = ref.querySelector<HTMLAudioElement>(
				'audio.vinyl__player-audio--destination'
			);

			if (!audio) {
				return;
			}

			state.audioElement = audio;

			state.audioElement.addEventListener('loadeddata', () => {
				withScope(() => {
					if (state.audioElement) {
						state.duration = state.audioElement.duration;
					}
				});
			});
		},
	},

	actions: {
		*playAudio() {
			if (state.isPlaying) {
				return;
			}

			if (!state.audioElement) {
				return;
			}

			yield state.audioElement.play();

			state.isPlaying = true;
		},

		pauseAudio: () => {
			state.isPlaying = false;
			state.audioElement?.pause();
		},

		*setAudio() {
			const ctx = getContext<VinylBlockContext>();

			state.currentAudio = ctx.audioSrc;

			if (!state.audioElement) {
				return;
			}

			if (state.currentAudio === ctx.audioSrc) {
				return;
			}

			state.audioElement.src = ctx.audioSrc;

			if (state.isPlaying) {
				yield* actions.playAudio();
			}
		},
	},
});

export {};
