import { MediaUIAttributes } from 'media-chrome/dist/constants.js';
import {
	MediaContainer,
	Attributes,
} from 'media-chrome/dist/media-container.js';

import labels from '../labels/index.js';
import { globalThis } from '../utils/server-safe-globals.js';

const MEDIA_UI_ATTRIBUTE_NAMES = Object.values(MediaUIAttributes);

/**
 * The container component for the media player.
 *
 * This component extends the `MediaContainer` component from `media-chrome` and
 * add translatable `aria-label` attribute for the container.
 *
 * @augments {MediaContainer}
 *
 * @attr {boolean} audio
 * @attr {string} autohide
 * @attr {string} breakpoints
 * @attr {boolean} gesturesdisabled
 * @attr {boolean} keyboardcontrol
 * @attr {boolean} noautohide
 * @attr {boolean} userinactive
 *
 * @cssproperty --media-background-color - `background-color` of container.
 * @cssproperty --media-slot-display - `display` of the media slot (default none for [audio] usage).
 */
class VinylContainer extends MediaContainer {
	static get observedAttributes() {
		return (
			[Attributes.AUTOHIDE, Attributes.GESTURES_DISABLED]
				.concat(MEDIA_UI_ATTRIBUTE_NAMES)
				// Filter out specific / complex data media UI attributes
				// that shouldn't be propagated to this state receiver element.
				.filter(
					(name) =>
						![
							MediaUIAttributes.MEDIA_RENDITION_LIST,
							MediaUIAttributes.MEDIA_AUDIO_TRACK_LIST,
							MediaUIAttributes.MEDIA_CHAPTERS_CUES,
						].includes(name)
				)
		);
	}

	connectedCallback() {
		super.connectedCallback();

		const isAudioChrome = this.getAttribute(Attributes.AUDIO) !== null;
		const label = isAudioChrome
			? labels.nouns.AUDIO_PLAYER()
			: labels.nouns.VIDEO_PLAYER();

		this.setAttribute('aria-label', label);
	}
}

if (!globalThis.customElements.get('vinyl-container')) {
	globalThis.customElements.define('vinyl-container', VinylContainer);
}

export { VinylContainer };
export default VinylContainer;
