import { RichText, useBlockProps } from '@wordpress/block-editor';
import type { BlockSaveProps } from '@wordpress/blocks';

import {
	VinylController,
	VinylControlBar,
	VinylMuteButton,
	VinylPlayButton,
	VinylPlaybackRateButton,
	VinylSeekBackwardButton,
	VinylSeekForwardButton,
	VinylTimeRange,
	VinylTimeDisplay,
	VinylVolumeRange,
} from '../react/index.js';

import type { Attributes } from './types';

export default function Save({ attributes }: BlockSaveProps<Attributes>) {
	const { loop, preload, src } = attributes;

	return (
		src && (
			<figure {...useBlockProps.save()}>
				<VinylController
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
					<VinylControlBar className="vinyl__control-bar">
						<div className="vinyl__media-controls">
							<VinylPlayButton></VinylPlayButton>
							<VinylSeekBackwardButton></VinylSeekBackwardButton>
							<VinylSeekForwardButton></VinylSeekForwardButton>
						</div>
						<div className="vinyl__media-range">
							<VinylTimeRange></VinylTimeRange>
							<VinylTimeDisplay showDuration></VinylTimeDisplay>
						</div>
						<div className="vinyl__media-sound">
							<VinylPlaybackRateButton></VinylPlaybackRateButton>
							<VinylMuteButton></VinylMuteButton>
							<VinylVolumeRange></VinylVolumeRange>
						</div>
					</VinylControlBar>
				</VinylController>
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
