import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

import { allowedBlocks } from './block.json';

const Edit = () => {
	const blockProps = useBlockProps();

	return (
		<div {...blockProps}>
			Audio Player
			<InnerBlocks allowedBlocks={allowedBlocks} />
		</div>
	);
};

export default Edit;
