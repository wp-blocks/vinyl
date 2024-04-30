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

import { Attributes } from '../types';

type Props = Omit<Attributes, 'caption' | 'id'>;

export default function Player({ loop, preload, src }: Props) {
	return (
		<MediaController audio={true} autohide="-1" className="vinyl__player">
			<audio slot="media" src={src} preload={preload} loop={loop} />
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
	);
}
