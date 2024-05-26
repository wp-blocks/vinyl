import { MediaPlayButton } from 'media-chrome';
import { MediaUIAttributes } from 'media-chrome/dist/constants.js';

import labels from '../labels/index.js';
import { globalThis } from '../utils/server-safe-globals.js';

/**
 * @param {VinylPlayButton} el
 */
const updateAriaLabel = (el) => {
	const label = el.mediaPaused ? labels.verbs.PLAY() : labels.verbs.PAUSE();
	el.setAttribute('aria-label', label);
};

/**
 * @slot play - An element shown when the media is paused and pressing the button will start media playback.
 * @slot pause - An element shown when the media is playing and pressing the button will pause media playback.
 * @slot icon - An element for representing play and pause states in a single icon
 *
 * @attr {boolean} mediapaused - (read-only) Present if the media is paused.
 *
 * @cssproperty [--media-play-button-display = inline-flex] - `display` property of button.
 */
class VinylPlayButton extends MediaPlayButton {
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
		if (attrName === MediaUIAttributes.MEDIA_PAUSED) {
			updateAriaLabel(this);
		}

		super.attributeChangedCallback(attrName, oldValue, newValue);
	}
}

if (!globalThis.customElements.get('vinyl-play-button')) {
	globalThis.customElements.define('vinyl-play-button', VinylPlayButton);
}

export { VinylPlayButton };
export default VinylPlayButton;
