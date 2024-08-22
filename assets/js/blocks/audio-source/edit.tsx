import { isBlobURL } from '@wordpress/blob';
import {
	BlockControls,
	BlockIcon,
	InspectorControls,
	MediaPlaceholder,
	MediaReplaceFlow,
	useBlockProps,
} from '@wordpress/block-editor';
import type { BlockEditProps } from '@wordpress/blocks';
import {
	Disabled,
	PanelBody,
	SelectControl,
	Spinner,
	ToggleControl,
} from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { __, _x } from '@wordpress/i18n';
import { audio as icon } from '@wordpress/icons';
import { store as noticesStore } from '@wordpress/notices';
import classnames from 'classnames';

import './editor.css';

import type { Attributes } from './types';
import { useUploadMediaFromBlobURL } from './utils';

const ALLOWED_MEDIA_TYPES = ['audio'];

export default function Edit({
	attributes,
	className,
	setAttributes,
	isSelected: isSingleSelected,
}: BlockEditProps<Attributes>) {
	const { id, loop, preload, src } = attributes;
	const [temporaryURL, setTemporaryURL] = useState(attributes.blob);

	useUploadMediaFromBlobURL({
		url: temporaryURL,
		allowedTypes: ALLOWED_MEDIA_TYPES,
		onChange: onSelectAudio,
		onError: onUploadError,
	});

	function toggleAttribute<K extends keyof Attributes>(attribute: K) {
		return (newValue: Attributes[K]) => {
			setAttributes({ [attribute]: newValue });
		};
	}

	function onSelectURL(newSrc: string) {
		// Set the block's src from the edit component's state, and switch off
		// the editing UI.
		if (newSrc !== src) {
			// Check if there's an embed block that handles this URL.
			// const embedBlock = createUpgradedEmbedBlock({
			// 	attributes: { url: newSrc },
			// });
			// if (undefined !== embedBlock && onReplace) {
			// 	onReplace(embedBlock);
			// 	return;
			// }
			setAttributes({ src: newSrc, id: undefined, blob: undefined });
			setTemporaryURL(undefined);
		}
	}

	const { createErrorNotice } = useDispatch(noticesStore);

	function onUploadError(message) {
		createErrorNotice(message, { type: 'snackbar' }).catch((e) => {
			throw e;
		});
	}

	function onSelectAudio(media: any) {
		if (!media?.url) {
			// In this case there was an error and we should continue in the editing state
			// previous attributes should be removed because they may be temporary blob urls.
			setAttributes({
				src: undefined,
				id: undefined,
				blob: undefined,
			});

			setTemporaryURL(undefined);

			return;
		}

		if (isBlobURL(media.url)) {
			setTemporaryURL(media.url);

			return;
		}

		// Sets the block's attribute and updates the edit component from the
		// selected media, then switches off the editing UI.
		setAttributes({
			src: media.url,
			id: media.id,
			blob: undefined,
		});

		setTemporaryURL(undefined);
	}

	const classes = classnames(className, 'vinyl__audio-source', {
		'is-transient': !!temporaryURL,
	});

	const blockProps = useBlockProps({
		className: classes,
	});

	if (!src && !temporaryURL) {
		return (
			<div {...blockProps}>
				<MediaPlaceholder
					icon={<BlockIcon icon={icon} />}
					onSelect={onSelectAudio}
					onSelectURL={onSelectURL}
					accept="audio/*"
					allowedTypes={ALLOWED_MEDIA_TYPES}
					value={attributes}
					onError={onUploadError}
				/>
			</div>
		);
	}

	return (
		<>
			{isSingleSelected && (
				<>
					<BlockControls group="other">
						<MediaReplaceFlow
							mediaId={id}
							mediaURL={src}
							allowedTypes={ALLOWED_MEDIA_TYPES}
							accept="audio/*"
							onSelect={onSelectAudio}
							onSelectURL={onSelectURL}
							onError={onUploadError}
						/>
					</BlockControls>
				</>
			)}

			<InspectorControls>
				<PanelBody title={__('Settings', 'vinyl')}>
					<ToggleControl
						__nextHasNoMarginBottom
						label={__('Loop', 'vinyl')}
						onChange={toggleAttribute('loop')}
						checked={loop}
					/>
					<SelectControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={_x(
							'Preload',
							'noun; Audio block parameter',
							'vinyl'
						)}
						value={preload ?? ''}
						// `undefined` is required for the preload attribute to be unset.
						onChange={(value) =>
							setAttributes({
								preload: value || undefined,
							})
						}
						options={[
							{
								value: '',
								label: __('Browser default', 'vinyl'),
							},
							{ value: 'auto', label: __('Auto', 'vinyl') },
							{
								value: 'metadata',
								label: __('Metadata', 'vinyl'),
							},
							{
								value: 'none',
								label: _x('None', 'Preload value', 'vinyl'),
							},
						]}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				{/*
				Disable the audio tag if the block is not selected
				so the user clicking on it won't play the
				file or change the position slider when the controls are enabled.
				*/}
				<Disabled isDisabled={!isSingleSelected}>
					<audio
						controls
						className="vinyl__player-audio--source"
						src={src ?? temporaryURL}
					/>
				</Disabled>

				{!!temporaryURL && <Spinner />}
			</div>
		</>
	);
}
