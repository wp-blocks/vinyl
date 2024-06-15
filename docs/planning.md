# Vinyl Audio Block

## Step One

Replicate the functionality of the audio block. Using the `audio` element.

## Step Two

Add a custom UI that replicates the features of the standard `audio` element.

### Color Supports

-   [Block Supports - Color](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/#color)
-   [Theme Supports - Color Palettes](https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-support/#block-color-palettes)

## Step Three

Incrementally add features to expand the functionality.

### Multiple blocks

It might be possible to break the whole player into separate blocks. This would allow the maximum in customization.

-   Duration Display - Static
-   Mute Button - Static
-   Play Button - Static
-   Playback Rate Button - Static
-   Seek Forward - Static
-   Seek Backward - Static
-   Time Display - Static
-   Time Range Display - Static
-   Volume Range - Static
-   Cover Image - Dynamic
-   Audio - Dynamic - This would be the audio element itself, it's src could be dynamically set based on the media upload file metadata.
-   Cover - Dynamic - The cover art for the audio. The data is retrieved similar to the above.
-   Audio Name - Dynamic - The title of the audio file.
-   Audio Author/Artist - Dynamic - The name of the author the audio file.

#### Possible

-   Playlist - This could be either dynamic or static. It would be coolest to associate it with a post type and could use the most recent or something like that, simplest would be associating a number of audio sources.
-   Seek Forward - Static - This and the below would be buttons to move through the playlist.
-   Seek Backward - Static

### Ideas

-   Remember playhead position. I've noticed many players start back at the beginning when you navigate back to the webpage.

-   Speed control. Globally remember last setting, probably just through `localStorage`.

-   Visualization. Start super simple, just the audio graph in 2D.

-   Playlist. Grouping audio files together, which can be played sequentially.

-   Styling. Offer some block customizations, though also make sure custom CSS can be used to override the existing styling.

-   Localization. Make it easily to translate. Make it work in different origination, right -> left, or top -> bottom.

-   Theme. Using [`renderToStaticMarkup`](https://react.dev/reference/react-dom/server/renderToStaticMarkup) to create the player_template.php, this would allow an identical experience between using the editor and how it dynamically renders the block.

#### Media Session

Adding support for the Media Session API, when available, would provide the additional information about the audio playing to the browser. Allowing, for example, to show the cover art when a phone's lock screen is enabled.

[Media Session](https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API)

> The Media Session API provides a way to customize media notifications. It does this by providing metadata for display by the user agent for the media your web app is playing.

[MediaMetadata](https://developer.mozilla.org/en-US/docs/Web/API/MediaMetadata)

> The `MediaMetadata` interface of the Media Session API allows a web page to provide rich media metadata for display in a platform UI.

## References

-   [media-chrome](https://www.npmjs.com/package/media-chrome) - Used on the [syntax.fm](https://syntax.fm) site. [media-chrome.org](https://www.media-chrome.org)

    Uses web components for media UI, simplifies the complexities of media on the web.

-   [wavesurfer.js](https://github.com/katspaugh/wavesurfer.js)

-   [Webamp](https://github.com/captbaritone/webamp)

-   [Media Session API](https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API)

-   [enqueue_block_assets](https://github.com/WordPress/gutenberg/issues/47924#issuecomment-1683815920) - Gutenberg loads the editor in an `iframe` this prevents `media-chrome` from hydrating the web components when in the editor. This hooks needs to be used to property enqueue the assets for inclusion in the `iframe`.
