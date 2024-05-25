import { MediaMuteButton } from 'media-chrome';
import { MediaUIAttributes } from 'media-chrome/dist/constants.js';

import labels from '../labels/index.js';
import { globalThis } from '../utils/server-safe-globals.js';

/**
 * @param {VinylMuteButton} el
 */
const updateAriaLabel = (el) => {
	const muted = el.mediaVolumeLevel === 'off';
	const label = muted ? labels.verbs.UNMUTE() : labels.verbs.MUTE();
	el.setAttribute('aria-label', label);
};

/**
 * @slot off - An element shown when the media is muted or the media’s volume is 0.
 * @slot low - An element shown when the media’s volume is “low” (less than 50% / 0.5).
 * @slot medium - An element shown when the media’s volume is “medium” (between 50% / 0.5 and 75% / 0.75).
 * @slot high - An element shown when the media’s volume is “high” (75% / 0.75 or greater).
 * @slot icon - An element for representing all states in a single icon
 *
 * @attr {string} mediavolumelevel - (read-only) Set to the media volume level.
 *
 * @cssproperty [--media-mute-button-display = inline-flex] - `display` property of button.
 */
class VinylMuteButton extends MediaMuteButton {
	static get observedAttributes() {
		return [
			...super.observedAttributes,
			MediaUIAttributes.MEDIA_VOLUME_LEVEL,
		];
	}

	connectedCallback() {
		super.connectedCallback();
		updateAriaLabel(this);
	}

	/**
	 * @param {string} attrName
	 * @param {any}    oldValue
	 * @param {any}    newValue
	 */
	attributeChangedCallback(attrName, oldValue, newValue) {
		if (attrName === MediaUIAttributes.MEDIA_VOLUME_LEVEL) {
			updateAriaLabel(this);
		}

		super.attributeChangedCallback(attrName, oldValue, newValue);
	}
}

if (!globalThis.customElements.get('vinyl-mute-button')) {
	globalThis.customElements.define('vinyl-mute-button', VinylMuteButton);
}

export { VinylMuteButton };
export default VinylMuteButton;
