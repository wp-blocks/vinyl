/**
 * Renders a loading indicator.
 *
 * @returns The loading indicator element.
 */
function keyframes() {
	return {
		__html: '@keyframes spin { 0% { transform: rotate(0deg) } 100% { transform: rotate(360deg) }}',
	};
}

type Props = {
	/**
	 * The size of the spinner. Default: '50px'.
	 */
	size?: string;

	/**
	 * The stroke width of the spinner. Default: '3px'.
	 */
	stroke?: string;

	/**
	 * The color of the spinner. Default: '#000'.
	 */
	color?: string;
};

/**
 * Generates a style object for a spinner component.
 *
 * @param size   The size of the spinner.
 * @param stroke The stroke width of the spinner.
 * @param color  The color of the spinner.
 *
 * @returns  An object containing inner and outer style properties for the spinner.
 */
function style(size: string, stroke: string, color: string) {
	return {
		inner: {
			animation: 'spin 0.5s linear infinite',
			height: size,
			width: size,
			border: `${stroke} solid transparent`,
			borderTopColor: color,
		},
		outer: {
			flexFlow: 'column nowrap',
		},
	};
}

/**
 * Generates a loading spinner component.
 */
export const Loading = ({
	size = '50px',
	stroke = '3px',
	color = '#000',
}: Props) => {
	const styles = style(size, stroke, color);

	return (
		<div
			style={styles.outer}
			className="w-full h-full my-4 flex flex-nowrap items-center justify-center"
		>
			<div style={styles.inner} className={'box-content rounded-full'} />
			<style dangerouslySetInnerHTML={keyframes()} />
		</div>
	);
};
