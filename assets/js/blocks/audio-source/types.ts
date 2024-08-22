/**
 * The attributes for the `vinyl/audio-source` block.
 */
export interface Attributes {
	/**
	 * The ID of the audio media source.
	 *
	 * `null` if the source is not from the media library.
	 */
	id?: number;

	/**
	 * Whether the audio should loop.
	 */
	loop?: boolean;

	/**
	 * The URL of the audio media source.
	 */
	src?: string;

	/**
	 * Whether the audio should be preloaded.
	 */
	preload?: string;

	/**
	 * The blob URL of the audio media source.
	 *
	 * This is only used for temporarily storing the audio source.
	 */
	blob?: string;
}
