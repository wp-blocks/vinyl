import { RichText, useBlockProps } from '@wordpress/block-editor';
import type { BlockSaveProps } from '@wordpress/blocks';
import {
	MediaPlaybackRateButton,
	MediaController,
	MediaControlBar,
	MediaTimeRange,
	MediaTimeDisplay,
	MediaVolumeRange,
	MediaPlayButton,
	MediaSeekBackwardButton,
	MediaSeekForwardButton,
	MediaMuteButton,
} from 'media-chrome/dist/react';

import type { Attributes } from './types';

export default function Save({ attributes }: BlockSaveProps<Attributes>) {
	const { loop, preload, src } = attributes;

	return (
		src && (
			<figure {...useBlockProps.save()}>
				<MediaController
					audio={true}
					autohide="-1"
					className="vinyl__player"
				>
					<audio
						slot="media"
						src={src}
						preload={preload}
						loop={loop}
					/>
					<MediaControlBar className="vinyl__control-bar">
						<div className="vinyl__media-controls">
							<MediaPlayButton></MediaPlayButton>
							<MediaSeekBackwardButton></MediaSeekBackwardButton>
							<MediaSeekForwardButton></MediaSeekForwardButton>
						</div>
						<div className="vinyl__media-range">
							<MediaTimeRange></MediaTimeRange>
							<MediaTimeDisplay showDuration></MediaTimeDisplay>
						</div>
						<div className="vinyl__media-sound">
							<MediaPlaybackRateButton></MediaPlaybackRateButton>
							<MediaMuteButton></MediaMuteButton>
							<MediaVolumeRange></MediaVolumeRange>
						</div>
					</MediaControlBar>
				</MediaController>
				{hasCaption(attributes) && (
					<RichText.Content
						tagName="figcaption"
						value={attributes.caption}
					/>
				)}
			</figure>
		)
	);
}

function hasCaption(
	props: Attributes
): props is Attributes & { caption: string } {
	return (
		typeof props.caption === 'string' && !RichText.isEmpty(props.caption)
	);
}
