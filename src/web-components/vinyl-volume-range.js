import { MediaVolumeRange } from 'media-chrome';
import { MediaUIAttributes } from 'media-chrome/dist/constants.js';

import labels from '../labels/index.js';
import { globalThis } from '../utils/server-safe-globals.js';

const toVolume = (el) => {
	if (el.mediaMuted) return 0;
	return el.mediaVolume;
};

const formatAsPercentString = ({ value }) => `${Math.round(value * 100)}%`;

/**
 * @attr {string} mediavolume - (read-only) Set to the media volume.
 * @attr {boolean} mediamuted - (read-only) Set to the media muted state.
 * @attr {string} mediavolumeunavailable - (read-only) Set if changing volume is unavailable.
 *
 * @cssproperty [--media-volume-range-display = inline-block] - `display` property of range.
 */
class VinylVolumeRange extends MediaVolumeRange {
	connectedCallback() {
		super.connectedCallback();
		this.range.setAttribute('aria-label', labels.nouns.VOLUME());
	}

	/**
	 * @param {string} attrName
	 * @param {any}    oldValue
	 * @param {any}    newValue
	 */
	attributeChangedCallback(attrName, oldValue, newValue) {
		super.attributeChangedCallback(attrName, oldValue, newValue);

		if (
			attrName === MediaUIAttributes.MEDIA_VOLUME ||
			attrName === MediaUIAttributes.MEDIA_MUTED
		) {
			this.range.valueAsNumber = toVolume(this);
			this.range.setAttribute(
				'aria-valuetext',
				formatAsPercentString(this.range)
			);
			this.updateBar();
		}
	}
}

if (!globalThis.customElements.get('vinyl-volume-range')) {
	globalThis.customElements.define('vinyl-volume-range', VinylVolumeRange);
}

export default VinylVolumeRange;
