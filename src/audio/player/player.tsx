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
				<MediaPlayButton></MediaPlayButton>
				<MediaSeekBackwardButton></MediaSeekBackwardButton>
				<MediaSeekForwardButton></MediaSeekForwardButton>
				<MediaTimeRange></MediaTimeRange>
				<MediaTimeDisplay showDuration></MediaTimeDisplay>
				<MediaPlaybackRateButton></MediaPlaybackRateButton>
				<MediaMuteButton></MediaMuteButton>
				<MediaVolumeRange></MediaVolumeRange>
			</MediaControlBar>
		</MediaController>
	);
}
