/* eslint-disable */
// @ts-nocheck

import React from "react";
import "../web-components/index.js";
import { toNativeProps } from "./common/utils.js";

/** @type { import("react").HTMLElement } */
const VinylContainer = React.forwardRef(({ children = [], ...props }, ref) => {
  return React.createElement('vinyl-container', toNativeProps({ ...props, suppressHydrationWarning: true, ref }), children);
});

export { VinylContainer };

/** @type { import("react").HTMLElement } */
const VinylControlBar = React.forwardRef(({ children = [], ...props }, ref) => {
  return React.createElement('vinyl-control-bar', toNativeProps({ ...props, suppressHydrationWarning: true, ref }), children);
});

export { VinylControlBar };

/** @type { import("react").HTMLElement } */
const VinylController = React.forwardRef(({ children = [], ...props }, ref) => {
  return React.createElement('vinyl-controller', toNativeProps({ ...props, suppressHydrationWarning: true, ref }), children);
});

export { VinylController };

/** @type { import("react").HTMLElement } */
const VinylDurationDisplay = React.forwardRef(({ children = [], ...props }, ref) => {
  return React.createElement('vinyl-duration-display', toNativeProps({ ...props, suppressHydrationWarning: true, ref }), children);
});

export { VinylDurationDisplay };

/** @type { import("react").HTMLElement } */
const VinylMuteButton = React.forwardRef(({ children = [], ...props }, ref) => {
  return React.createElement('vinyl-mute-button', toNativeProps({ ...props, suppressHydrationWarning: true, ref }), children);
});

export { VinylMuteButton };

/** @type { import("react").HTMLElement } */
const VinylPlayButton = React.forwardRef(({ children = [], ...props }, ref) => {
  return React.createElement('vinyl-play-button', toNativeProps({ ...props, suppressHydrationWarning: true, ref }), children);
});

export { VinylPlayButton };

/** @type { import("react").HTMLElement } */
const VinylPlaybackRateButton = React.forwardRef(({ children = [], ...props }, ref) => {
  return React.createElement('vinyl-playback-rate-button', toNativeProps({ ...props, suppressHydrationWarning: true, ref }), children);
});

export { VinylPlaybackRateButton };

/** @type { import("react").HTMLElement } */
const VinylSeekBackwardButton = React.forwardRef(({ children = [], ...props }, ref) => {
  return React.createElement('vinyl-seek-backward-button', toNativeProps({ ...props, suppressHydrationWarning: true, ref }), children);
});

export { VinylSeekBackwardButton };

/** @type { import("react").HTMLElement } */
const VinylSeekForwardButton = React.forwardRef(({ children = [], ...props }, ref) => {
  return React.createElement('vinyl-seek-forward-button', toNativeProps({ ...props, suppressHydrationWarning: true, ref }), children);
});

export { VinylSeekForwardButton };

/** @type { import("react").HTMLElement } */
const VinylTimeDisplay = React.forwardRef(({ children = [], ...props }, ref) => {
  return React.createElement('vinyl-time-display', toNativeProps({ ...props, suppressHydrationWarning: true, ref }), children);
});

export { VinylTimeDisplay };

/** @type { import("react").HTMLElement } */
const VinylTimeRange = React.forwardRef(({ children = [], ...props }, ref) => {
  return React.createElement('vinyl-time-range', toNativeProps({ ...props, suppressHydrationWarning: true, ref }), children);
});

export { VinylTimeRange };

/** @type { import("react").HTMLElement } */
const VinylVolumeRange = React.forwardRef(({ children = [], ...props }, ref) => {
  return React.createElement('vinyl-volume-range', toNativeProps({ ...props, suppressHydrationWarning: true, ref }), children);
});

export { VinylVolumeRange };
