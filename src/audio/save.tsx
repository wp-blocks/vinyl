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
import { computeStyle } from './use-style.js';

export default function Save({ attributes }: BlockSaveProps<Attributes>) {
	const { loop, preload, src } = attributes;

	const blockProps = useBlockProps.save();

	// Not using a hook here because the save function should be static.
	const style = computeStyle(attributes);

	return (
		src && (
			<figure {...blockProps}>
				<VinylController
					audio={true}
					autohide="-1"
					className="vinyl__player"
					style={style}
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
