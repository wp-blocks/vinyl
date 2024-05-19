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
} from '../../react/index.js';
import type { Attributes } from '../types';

type Props = Omit<Attributes, 'caption' | 'id'> & {
	style?: React.CSSProperties;
};

export default function Player({ loop, preload, src, style }: Props) {
	return (
		<VinylController
			audio={true}
			autohide="-1"
			className="vinyl__player"
			style={style}
		>
			<audio slot="media" src={src} preload={preload} loop={loop} />
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
	);
}
