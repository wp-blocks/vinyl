# Vinyl Audio Block

## Step One

Replicate the functionality of the audio block. Using the `audio` element.

## Step Two

Add a custom UI that replicates the features of the standard `audio` element.

## Step Three

Incrementally add features to expand the functionality.

### Ideas

-   Remember playhead position. I've noticed many players start back at the beginning when you navigate back to the webpage.

-   Speed control. Globally remember last setting, probably just through `localStorage`.

-   Visualization. Start super simple, just the audio graph in 2D.

-   Playlist. Grouping audio files together, which can be played sequentially.

-   Styling. Offer some block customizations, though also make sure custom CSS can be used to override the existing styling.

-   Localization. Make it easily to translate. Make it work in different origination, right -> left, or top -> bottom.

## References

-   [media-chrome](https://www.npmjs.com/package/media-chrome) - Used on the [syntax.fm](https://syntax.fm) site. [media-chrome.org](https://www.media-chrome.org)

    Uses web components for media UI, simplifies the complexities of media on the web.

-   [wavesurfer.js](https://github.com/katspaugh/wavesurfer.js)

-   [Webamp](https://github.com/captbaritone/webamp)

-   [Media Session API](https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API)

-   [enqueue_block_assets](https://github.com/WordPress/gutenberg/issues/47924#issuecomment-1683815920) - Gutenberg loads the editor in an `iframe` this prevents `media-chrome` from hydrating the web components when in the editor. This hooks needs to be used to property enqueue the assets for inclusion in the `iframe`.
