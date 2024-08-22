export interface VinylBlockContext {
	audioSrc: string;
}

export interface VinylBlockState {
	/**
	 * The destination audio element.
	 */
	audioElement: HTMLAudioElement | null;

	/**
	 * The URL of the current audio.
	 */
	currentAudio: string | null;

	/**
	 * The duration of the current audio.
	 */
	duration: number | null;

	/**
	 * Whether the audio is playing.
	 */
	isPlaying: boolean;

	/**
	 * Whether the audio source of the current context is playing.
	 */
	isAudioSourcePlaying: boolean;
}

export interface VinylBlockActions {
	/**
	 * Play the current audio.
	 */
	playAudio: () => Generator<Promise<any>>;

	/**
	 * Pause the current audio.
	 */
	pauseAudio: () => void;

	/**
	 * Set the current audio to the audio source of the current context.
	 */
	setAudio: () => Generator<Promise<any>>;
}
