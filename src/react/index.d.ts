/* eslint-disable */
// @ts-nocheck

import type React from 'react';

import type * as CSS from 'csstype';
declare global {
  interface Element {
    slot?: string;
  }
}

declare module 'csstype' {
  interface Properties {
    // Should add generic support for any CSS variables
    [index: `--${string}`]: any;
  }
}

type GenericProps = { [k: string]: any };
type GenericElement = HTMLElement;

type GenericForwardRef = React.ForwardRefExoticComponent<
  GenericProps & React.RefAttributes<GenericElement | undefined>
>;

declare const VinylContainer: GenericForwardRef;
export { VinylContainer };

declare const VinylControlBar: GenericForwardRef;
export { VinylControlBar };

declare const VinylController: GenericForwardRef;
export { VinylController };

declare const VinylMuteButton: GenericForwardRef;
export { VinylMuteButton };

declare const VinylPlayButton: GenericForwardRef;
export { VinylPlayButton };

declare const VinylPlaybackRateButton: GenericForwardRef;
export { VinylPlaybackRateButton };

declare const VinylSeekBackwardButton: GenericForwardRef;
export { VinylSeekBackwardButton };

declare const VinylSeekForwardButton: GenericForwardRef;
export { VinylSeekForwardButton };

declare const VinylTimeDisplay: GenericForwardRef;
export { VinylTimeDisplay };

declare const VinylTimeRange: GenericForwardRef;
export { VinylTimeRange };

declare const VinylVolumeRange: GenericForwardRef;
export { VinylVolumeRange };
