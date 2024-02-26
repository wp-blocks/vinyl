import { RichText, useBlockProps } from '@wordpress/block-editor';
import type { BlockSaveProps } from '@wordpress/blocks';

import type { Props } from './types';

export default function Save({ attributes }: BlockSaveProps<Props>) {
	const { loop, preload, src } = attributes;

	return (
		src && (
			<figure {...useBlockProps.save()}>
				<audio
					controls="controls"
					src={src}
					loop={loop}
					preload={preload}
				/>
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

function hasCaption(props: Props): props is Props & { caption: string } {
	return (
		typeof props.caption === 'string' && !RichText.isEmpty(props.caption)
	);
}
