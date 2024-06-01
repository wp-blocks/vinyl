import { RichText, useBlockProps } from '@wordpress/block-editor';
import type { BlockSaveProps } from '@wordpress/blocks';

import { Player } from './player/index.js';
import type { Attributes } from './types';
import { computeStyle } from './use-style.js';

export default function Save({ attributes }: BlockSaveProps<Attributes>) {
	const { loop, preload, src } = attributes;

	const blockProps = useBlockProps.save();

	// Not using a hook here because the save function should be static.
	const style = computeStyle(attributes);

	return (
		src && (
			<figure {...blockProps}>
				<Player loop={loop} preload={preload} src={src} style={style} />
				{hasCaption(attributes) && (
					<RichText.Content
						tagName="figcaption"
						value={attributes.caption}
					/>
				)}
			</figure>
		)
	);
}

function hasCaption(
	props: Attributes
): props is Attributes & { caption: string } {
	return (
		typeof props.caption === 'string' && !RichText.isEmpty(props.caption)
	);
}
