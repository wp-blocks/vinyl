import { getBlobByURL, isBlobURL } from '@wordpress/blob';
import {
	BlockControls,
	BlockIcon,
	InspectorControls,
	MediaPlaceholder,
	MediaReplaceFlow,
	useBlockProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import type { BlockEditProps } from '@wordpress/blocks';
import {
	Disabled,
	PanelBody,
	SelectControl,
	Spinner,
	ToggleControl,
} from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { __, _x } from '@wordpress/i18n';
import { audio as icon } from '@wordpress/icons';
import { store as noticesStore } from '@wordpress/notices';
import classnames from 'classnames';

import './editor.scss';

import Caption from './edit/caption';
import { Player } from './player/index';
import type { Attributes } from './types';

const ALLOWED_MEDIA_TYPES = ['audio'];

function VinylEdit({
	attributes,
	className,
	setAttributes,
	isSelected: isSingleSelected,
	insertBlocksAfter,
}: BlockEditProps<Attributes>) {
	const { id, loop, preload, src } = attributes;

	const isTemporaryAudio = !id && isBlobURL(src);

	const { mediaUpload } = useSelect(
		(select) => ({
			mediaUpload: (select(blockEditorStore) as any).getSettings()
				.mediaUpload,
		}),
		[]
	);

	useEffect(() => {
		if (!id && isBlobURL(src)) {
			const file = getBlobByURL(src);

			if (file) {
				mediaUpload({
					filesList: [file],
					onFileChange: ([media]) => onSelectAudio(media),
					onError: (e) => onUploadError(e),
					allowedTypes: ALLOWED_MEDIA_TYPES,
				});
			}
		}
	}, []);

	function toggleAttribute(attribute: any) {
		return (newValue: any) => {
			setAttributes({ [attribute]: newValue });
		};
	}

	function onSelectURL(newSrc: string): void {
		// Set the block's src from the edit component's state, and switch off
		// the editing UI.
		if (newSrc !== src) {
			setAttributes({ src: newSrc, id: undefined });
		}
	}

	const { createErrorNotice } = useDispatch(noticesStore);
	function onUploadError(message: string) {
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
				caption: undefined,
			});
			return;
		}
		// Sets the block's attribute and updates the edit component from the
		// selected media, then switches off the editing UI.
		setAttributes({
			src: media.url,
			id: media.id,
			caption: media.caption,
		});
	}

	const classes = classnames(className, {
		'is-transient': isTemporaryAudio,
	});

	const blockProps = useBlockProps({
		className: classes,
	});

	if (!src) {
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
						label={_x(
							'Preload',
							'noun; Audio block parameter',
							'vinyl'
						)}
						value={preload || ''}
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

			<figure {...blockProps}>
				{/*
					Disable the audio tag if the block is not selected
					so the user clicking on it won't play the
					file or change the position slider when the controls are enabled.
				*/}

				<Disabled isDisabled={!isSingleSelected}>
					<Player loop={loop} preload={preload} src={src} />
				</Disabled>

				{isTemporaryAudio && <Spinner />}

				<Caption
					attributes={attributes}
					setAttributes={setAttributes}
					isSelected={isSingleSelected}
					insertBlocksAfter={insertBlocksAfter}
					label={__('Audio caption text', 'vinyl')}
					showToolbarButton={isSingleSelected}
				/>
			</figure>
		</>
	);
}

export default VinylEdit;
