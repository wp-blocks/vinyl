import { MediaTimeRange } from 'media-chrome';

import labels from '../labels/index.js';
import { globalThis } from '../utils/server-safe-globals.js';

/**
 * @slot preview - An element that slides along the timeline to the position of the pointer hovering.
 * @slot preview-arrow - An arrow element that slides along the timeline to the position of the pointer hovering.
 * @slot current - An element that slides along the timeline to the position of the current time.
 *
 * @attr {string} mediabuffered - (read-only) Set to the buffered time ranges.
 * @attr {string} mediaplaybackrate - (read-only) Set to the media playback rate.
 * @attr {string} mediaduration - (read-only) Set to the media duration.
 * @attr {string} mediaseekable - (read-only) Set to the seekable time ranges.
 * @attr {boolean} mediapaused - (read-only) Present if the media is paused.
 * @attr {boolean} medialoading - (read-only) Present if the media is loading.
 * @attr {string} mediacurrenttime - (read-only) Set to the current media time.
 * @attr {string} mediapreviewimage - (read-only) Set to the timeline preview image URL.
 * @attr {string} mediapreviewtime - (read-only) Set to the timeline preview time.
 *
 * @csspart box - A CSS part that selects both the preview and current box elements.
 * @csspart preview-box - A CSS part that selects the preview box element.
 * @csspart current-box - A CSS part that selects the current box element.
 * @csspart arrow - A CSS part that selects the arrow element.
 *
 * @cssproperty [--media-time-range-display = inline-block] - `display` property of range.
 *
 * @cssproperty --media-preview-transition-property - `transition-property` of range hover preview.
 * @cssproperty --media-preview-transition-duration-out - `transition-duration` out of range hover preview.
 * @cssproperty --media-preview-transition-delay-out - `transition-delay` out of range hover preview.
 * @cssproperty --media-preview-transition-duration-in - `transition-duration` in of range hover preview.
 * @cssproperty --media-preview-transition-delay-in - `transition-delay` in of range hover preview.
 *
 * @cssproperty --media-preview-thumbnail-background - `background` of range preview thumbnail.
 * @cssproperty --media-preview-thumbnail-box-shadow - `box-shadow` of range preview thumbnail.
 * @cssproperty --media-preview-thumbnail-max-width - `max-width` of range preview thumbnail.
 * @cssproperty --media-preview-thumbnail-max-height - `max-height` of range preview thumbnail.
 * @cssproperty --media-preview-thumbnail-min-width - `min-width` of range preview thumbnail.
 * @cssproperty --media-preview-thumbnail-min-height - `min-height` of range preview thumbnail.
 * @cssproperty --media-preview-thumbnail-border-radius - `border-radius` of range preview thumbnail.
 * @cssproperty --media-preview-thumbnail-border - `border` of range preview thumbnail.
 *
 * @cssproperty --media-preview-chapter-background - `background` of range preview chapter display.
 * @cssproperty --media-preview-chapter-border-radius - `border-radius` of range preview chapter display.
 * @cssproperty --media-preview-chapter-padding - `padding` of range preview chapter display.
 * @cssproperty --media-preview-chapter-margin - `margin` of range preview chapter display.
 * @cssproperty --media-preview-chapter-text-shadow - `text-shadow` of range preview chapter display.
 *
 * @cssproperty --media-preview-time-background - `background` of range preview time display.
 * @cssproperty --media-preview-time-border-radius - `border-radius` of range preview time display.
 * @cssproperty --media-preview-time-padding - `padding` of range preview time display.
 * @cssproperty --media-preview-time-margin - `margin` of range preview time display.
 * @cssproperty --media-preview-time-text-shadow - `text-shadow` of range preview time display.
 *
 * @cssproperty --media-box-display - `display` of range box.
 * @cssproperty --media-box-margin - `margin` of range box.
 * @cssproperty --media-box-padding-left - `padding-left` of range box.
 * @cssproperty --media-box-padding-right - `padding-right` of range box.
 * @cssproperty --media-box-border-radius - `border-radius` of range box.
 *
 * @cssproperty --media-preview-box-display - `display` of range preview box.
 * @cssproperty --media-preview-box-margin - `margin` of range preview box.
 *
 * @cssproperty --media-current-box-display - `display` of range current box.
 * @cssproperty --media-current-box-margin - `margin` of range current box.
 *
 * @cssproperty --media-box-arrow-display - `display` of range box arrow.
 * @cssproperty --media-box-arrow-background - `border-top-color` of range box arrow.
 * @cssproperty --media-box-arrow-border-width - `border-width` of range box arrow.
 * @cssproperty --media-box-arrow-height - `height` of range box arrow.
 * @cssproperty --media-box-arrow-width - `width` of range box arrow.
 * @cssproperty --media-box-arrow-offset - `translateX` offset of range box arrow.
 */
class VinylTimeRange extends MediaTimeRange {
	connectedCallback() {
		super.connectedCallback();
		this.range.setAttribute('aria-label', labels.nouns.SEEK());
	}
}

if (!globalThis.customElements.get('vinyl-time-range')) {
	globalThis.customElements.define('vinyl-time-range', VinylTimeRange);
}

export default VinylTimeRange;
