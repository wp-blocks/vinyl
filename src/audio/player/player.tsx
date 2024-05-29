import {
	VinylController,
	VinylControlBar,
	VinylDurationDisplay,
	VinylMuteButton,
	VinylPlayButton,
	VinylPlaybackRateButton,
	VinylSeekBackwardButton,
	VinylSeekForwardButton,
	VinylTimeRange,
	VinylTimeDisplay,
} from '../../react/index.js';
import type { Attributes } from '../types';

type Props = Pick<Attributes, 'loop' | 'preload' | 'src'> & {
	style?: React.CSSProperties;
};

export default function Player({ loop, preload, src, style }: Props) {
	return (
		<VinylController audio={true} autohide="-1" style={style}>
			<audio slot="media" src={src} preload={preload} loop={loop} />
			<VinylControlBar>
				<VinylSeekBackwardButton></VinylSeekBackwardButton>
				<VinylPlayButton></VinylPlayButton>
				<VinylSeekForwardButton></VinylSeekForwardButton>
				<VinylTimeDisplay></VinylTimeDisplay>
				<VinylTimeRange className="vinyl__time-range"></VinylTimeRange>
				<VinylDurationDisplay></VinylDurationDisplay>
				<VinylPlaybackRateButton></VinylPlaybackRateButton>
				<VinylMuteButton></VinylMuteButton>
			</VinylControlBar>
		</VinylController>
	);
}
