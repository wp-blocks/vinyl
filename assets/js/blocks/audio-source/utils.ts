/**
 * WordPress dependencies
 */
import { getBlobByURL, isBlobURL, revokeBlobURL } from '@wordpress/blob';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useLayoutEffect, useEffect, useRef } from '@wordpress/element';

interface Args {
	/**
	 * Blob URL.
	 */
	url?: string;

	/**
	 * Array of allowed media types.
	 */
	allowedTypes?: string[];

	/**
	 * Function called when the media is uploaded.
	 */
	onChange?: (media: any) => void;

	/**
	 * Function called when an error happens.
	 */
	onError?: (message: string) => void;
}

/**
 * Handles uploading a media file from a blob URL on mount.
 *
 * Inspired by https://github.com/WordPress/gutenberg/blob/4d4522c3102a9e32b8a1a36b09f7c1ab43d3ad37/packages/block-library/src/utils/hooks.js#L30-L90
 *
 * @param {Args} args Upload media arguments.
 */
export function useUploadMediaFromBlobURL(args: Args = {}) {
	const latestArgs = useRef(args);
	const hasUploadStarted = useRef(false);
	const { getSettings } = useSelect(
		(select) => ({
			getSettings: select(blockEditorStore).getSettings,
		}),
		[]
	);

	useLayoutEffect(() => {
		latestArgs.current = args;
	});

	useEffect(() => {
		// Uploading is a special effect that can't be canceled via the cleanup method.
		// The extra check avoids duplicate uploads in development mode (React.StrictMode).
		if (hasUploadStarted.current) {
			return;
		}
		if (!latestArgs.current.url || !isBlobURL(latestArgs.current.url)) {
			return;
		}

		const file = getBlobByURL(latestArgs.current.url);
		if (!file) {
			return;
		}

		const { url, allowedTypes, onChange, onError } = latestArgs.current;
		const { mediaUpload } = getSettings();

		hasUploadStarted.current = true;

		mediaUpload({
			filesList: [file],
			allowedTypes,
			onFileChange: ([media]) => {
				if (isBlobURL(media?.url)) {
					return;
				}

				revokeBlobURL(url);
				onChange?.(media);
				hasUploadStarted.current = false;
			},
			onError: (message) => {
				revokeBlobURL(url);
				onError?.(message);
				hasUploadStarted.current = false;
			},
		});
	}, [getSettings]);
}
