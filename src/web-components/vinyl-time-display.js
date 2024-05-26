import { __, sprintf } from '@wordpress/i18n';
import {
	default as MediaTimeDisplay,
	Attributes,
} from 'media-chrome/dist/media-time-display.js';

import labels from '../labels/index.js';
import { globalThis } from '../utils/server-safe-globals.js';
import { formatAsTimePhrase, formatTime } from '../utils/time.js';

// Todo: Use data locals: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString

const DEFAULT_TIMES_SEP = '&nbsp;/&nbsp;';

/**
 * @param {VinylTimeDisplay} el
 * @param {Object}           options
 * @param {string}           [options.timesSep]
 */
const formatTimesLabel = (el, { timesSep = DEFAULT_TIMES_SEP } = {}) => {
	const showRemaining = el.hasAttribute(Attributes.REMAINING);
	const showDuration = el.hasAttribute(Attributes.SHOW_DURATION);
	const currentTime = el.mediaCurrentTime ?? 0;
	const [, seekableEnd] = el.mediaSeekable ?? [];
	let endTime = 0;

	if (Number.isFinite(el.mediaDuration)) {
		endTime = el.mediaDuration;
	} else if (Number.isFinite(seekableEnd)) {
		endTime = seekableEnd;
	}

	const timeLabel = showRemaining
		? formatTime(0 - (endTime - currentTime))
		: formatTime(currentTime);

	if (!showDuration) return timeLabel;
	return `${timeLabel}${timesSep}${formatTime(endTime)}`;
};

const DEFAULT_MISSING_TIME_PHRASE = __(
	'Media not loaded, unknown time.',
	'vinyl'
);

const updateAriaValueText = (el) => {
	const currentTime = el.mediaCurrentTime;
	const [, seekableEnd] = el.mediaSeekable ?? [];
	let endTime = null;

	if (Number.isFinite(el.mediaDuration)) {
		endTime = el.mediaDuration;
	} else if (Number.isFinite(seekableEnd)) {
		endTime = seekableEnd;
	}

	if (currentTime === null || endTime === null) {
		el.setAttribute('aria-valuetext', DEFAULT_MISSING_TIME_PHRASE);
		return;
	}

	const showRemaining = el.hasAttribute(Attributes.REMAINING);
	const showDuration = el.hasAttribute(Attributes.SHOW_DURATION);

	const currentTimePhrase = showRemaining
		? formatAsTimePhrase(0 - (endTime - currentTime))
		: formatAsTimePhrase(currentTime);

	if (!showDuration) {
		el.setAttribute('aria-valuetext', currentTimePhrase);
		return;
	}

	const totalTimePhrase = formatAsTimePhrase(endTime);
	const fullPhrase = sprintf(
		/* translators: 1: current time, 2: total time */
		__('%1$s of %2$s', 'vinyl'),
		currentTimePhrase,
		totalTimePhrase
	);

	el.setAttribute('aria-valuetext', fullPhrase);
};

/**
 * @attr {boolean} remaining - Toggle on to show the remaining time instead of elapsed time.
 * @attr {boolean} showduration - Toggle on to show the duration.
 * @attr {boolean} disabled - The Boolean disabled attribute makes the element not mutable or focusable.
 * @attr {boolean} notoggle - Set this to disable click or tap behavior that toggles between remaining and current time.
 * @attr {string} mediacurrenttime - (read-only) Set to the current media time.
 * @attr {string} mediaduration - (read-only) Set to the media duration.
 * @attr {string} mediaseekable - (read-only) Set to the seekable time ranges.
 *
 * @cssproperty [--media-time-display-display = inline-flex] - `display` property of display.
 * @cssproperty --media-control-hover-background - `background` of control hover state.
 */
class VinylTimeDisplay extends MediaTimeDisplay {
	/** @type {HTMLSlotElement} */
	#slot;

	constructor() {
		super();

		this.#slot = this.shadowRoot.querySelector('slot');
		this.#slot.innerHTML = `${formatTimesLabel(this)}`;
	}

	connectedCallback() {
		super.connectedCallback();
		this.setAttribute('aria-label', labels.nouns.PLAYBACK_TIME());
	}

	update() {
		const timesLabel = formatTimesLabel(this);

		updateAriaValueText(this);

		// Only update if it changed, timeupdate events are called a few times per second.
		if (timesLabel !== this.#slot.innerHTML) {
			this.#slot.innerHTML = timesLabel;
		}
	}
}

if (!globalThis.customElements.get('vinyl-time-display')) {
	globalThis.customElements.define('vinyl-time-display', VinylTimeDisplay);
}

export default VinylTimeDisplay;
