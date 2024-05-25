import { __, sprintf } from '@wordpress/i18n';
import {
	MediaUIEvents,
	MediaUIAttributes,
} from 'media-chrome/dist/constants.js';
import {
	default as MediaPlaybackRateButton,
	Attributes,
} from 'media-chrome/dist/media-playback-rate-button.js';
import { AttributeTokenList } from 'media-chrome/dist/utils/attribute-token-list.js';

import labels from '../labels/index.js';
import { document, globalThis } from '../utils/server-safe-globals.js';

export const DEFAULT_RATES = [1, 1.2, 1.5, 1.7, 2];
export const DEFAULT_RATE = 1;

const slotTemplate = document.createElement('template');
slotTemplate.innerHTML = /*html*/ `
  <style>
    :host {
      min-width: 5ch;
      padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
    }
  </style>
  <slot name="icon"></slot>
`;

/**
 * @attr {string} rates - Set custom playback rates for the user to choose from.
 * @attr {string} mediaplaybackrate - (read-only) Set to the media playback rate.
 *
 * @cssproperty [--media-playback-rate-button-display = inline-flex] - `display` property of button.
 */
class VinylPlaybackRateButton extends MediaPlaybackRateButton {
	static get observedAttributes() {
		return [
			...super.observedAttributes,
			MediaUIAttributes.MEDIA_PLAYBACK_RATE,
			Attributes.RATES,
		];
	}

	/** @type {AttributeTokenList} */
	#rates = new AttributeTokenList(this, Attributes.RATES, {
		defaultValue: DEFAULT_RATES,
	});

	constructor(options = {}) {
		super({ slotTemplate, ...options });
		/** @type {HTMLElement} */
		// @ts-expect-error: The `shadowRoot` property is set by the parent class.
		this.container = this.shadowRoot.querySelector('slot[name="icon"]');
		this.container.innerHTML = sprintf(
			/* translators: playback rate with multiplication symbol */
			__('%sx', 'vinyl'),
			DEFAULT_RATE
		);
	}

	attributeChangedCallback(attrName, oldValue, newValue) {
		super.attributeChangedCallback(attrName, oldValue, newValue);

		if (attrName === Attributes.RATES) {
			this.#rates.value = newValue;
		}
		if (attrName === MediaUIAttributes.MEDIA_PLAYBACK_RATE) {
			const newPlaybackRate = newValue ? +newValue : Number.NaN;
			const playbackRate = !Number.isNaN(newPlaybackRate)
				? newPlaybackRate
				: DEFAULT_RATE;
			this.container.innerHTML = sprintf(
				/* translators: playback rate with multiplication symbol */
				__('%sx', 'vinyl'),
				playbackRate
			);
			this.setAttribute(
				'aria-label',
				labels.nouns.PLAYBACK_RATE({ playbackRate })
			);
		}
	}

	/**
	 * @type { AttributeTokenList | Array<number>} Will return a DOMTokenList.
	 * Setting a value will accept an array of numbers.
	 */
	get rates() {
		return this.#rates;
	}

	set rates(value) {
		if (!value) {
			this.#rates.value = '';
		} else if (Array.isArray(value)) {
			this.#rates.value = value.join(' ');
		}
	}

	handleClick() {
		const availableRates = Array.from(
			this.#rates.values(),
			(str) => +str
		).sort((a, b) => a - b);

		const detail =
			availableRates.find((r) => r > this.mediaPlaybackRate) ??
			availableRates[0] ??
			DEFAULT_RATE;
		const evt = new globalThis.CustomEvent(
			MediaUIEvents.MEDIA_PLAYBACK_RATE_REQUEST,
			{ composed: true, bubbles: true, detail }
		);
		this.dispatchEvent(evt);
	}
}

if (!globalThis.customElements.get('vinyl-playback-rate-button')) {
	globalThis.customElements.define(
		'vinyl-playback-rate-button',
		VinylPlaybackRateButton
	);
}

export default VinylPlaybackRateButton;
