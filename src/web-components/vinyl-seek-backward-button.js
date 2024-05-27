import { MediaChromeButton } from 'media-chrome';
import {
	MediaUIEvents,
	MediaUIAttributes,
} from 'media-chrome/dist/constants.js';

import labels from '../labels/index.js';
import {
	getNumericAttr,
	setNumericAttr,
	getSlotted,
	updateIconText,
} from '../utils/element-utils.js';
import { globalThis } from '../utils/server-safe-globals.js';

export const Attributes = {
	SEEK_OFFSET: 'seekoffset',
};

const DEFAULT_SEEK_OFFSET = 30;

const backwardIcon = `<svg aria-hidden="true" viewBox="0 0 20 24"><defs><style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style></defs><text class="text value" transform="translate(2.18 19.87)">${DEFAULT_SEEK_OFFSET}</text><path d="M10 6V3L4.37 7 10 10.94V8a5.54 5.54 0 0 1 1.9 10.48v2.12A7.5 7.5 0 0 0 10 6Z"/></svg>`;

const slotTemplate = document.createElement('template');
slotTemplate.innerHTML = `
  <slot name="icon">${backwardIcon}</slot>
`;

const DEFAULT_TIME = 0;

/**
 * @slot icon - The element shown for the seek backward button’s display.
 *
 * @attr {string} seekoffset - Adjusts how much time (in seconds) the playhead should seek backward.
 * @attr {string} mediacurrenttime - (read-only) Set to the current media time.
 *
 * @cssproperty [--media-seek-backward-button-display = inline-flex] - `display` property of button.
 */
class VinylSeekBackwardButton extends MediaChromeButton {
	static get observedAttributes() {
		return [
			...super.observedAttributes,
			MediaUIAttributes.MEDIA_CURRENT_TIME,
			Attributes.SEEK_OFFSET,
		];
	}

	constructor(options = {}) {
		super({ slotTemplate, ...options });
	}

	connectedCallback() {
		this.seekOffset = getNumericAttr(
			this,
			Attributes.SEEK_OFFSET,
			DEFAULT_SEEK_OFFSET
		);
		super.connectedCallback();
	}

	attributeChangedCallback(attrName, _oldValue, newValue) {
		if (attrName === Attributes.SEEK_OFFSET) {
			this.seekOffset = getNumericAttr(
				this,
				Attributes.SEEK_OFFSET,
				DEFAULT_SEEK_OFFSET
			);
		}

		super.attributeChangedCallback(attrName, _oldValue, newValue);
	}

	// Own props

	/**
	 * @type {number | undefined} Seek amount in seconds
	 */
	get seekOffset() {
		return getNumericAttr(
			this,
			Attributes.SEEK_OFFSET,
			DEFAULT_SEEK_OFFSET
		);
	}

	/**
	 * @param {number | undefined} value
	 */
	set seekOffset(value) {
		setNumericAttr(this, Attributes.SEEK_OFFSET, value);
		this.setAttribute(
			'aria-label',
			labels.verbs.SEEK_BACK_N_SECS({ seekOffset: this.seekOffset })
		);
		updateIconText(
			getSlotted(this, 'icon'),
			typeof this.seekOffset === 'number'
				? this.seekOffset.toString()
				: ''
		);
	}

	// Props derived from Media UI Attributes

	/**
	 * The current time
	 * @type {number | undefined} In seconds
	 */
	get mediaCurrentTime() {
		return getNumericAttr(
			this,
			MediaUIAttributes.MEDIA_CURRENT_TIME,
			DEFAULT_TIME
		);
	}

	/**
	 * @param {number | undefined} time
	 */
	set mediaCurrentTime(time) {
		setNumericAttr(this, MediaUIAttributes.MEDIA_CURRENT_TIME, time);
	}

	handleClick() {
		if (!this.mediaCurrentTime || !this.seekOffset) return;
		const detail = Math.max(this.mediaCurrentTime - this.seekOffset, 0);
		const evt = new globalThis.CustomEvent(
			MediaUIEvents.MEDIA_SEEK_REQUEST,
			{
				composed: true,
				bubbles: true,
				detail,
			}
		);
		this.dispatchEvent(evt);
	}
}

if (!globalThis.customElements.get('vinyl-seek-backward-button')) {
	globalThis.customElements.define(
		'vinyl-seek-backward-button',
		VinylSeekBackwardButton
	);
}

export default VinylSeekBackwardButton;
