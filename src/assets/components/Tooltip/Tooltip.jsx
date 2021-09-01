import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './Tooltip.module.css';

function Tooltip({ children, placement, arrow, text, customCSS }) {
	const [tooltipOpen, setTooltipOpen] = useState(false);
	const toggle = (open) => setTooltipOpen(open);

	return (
		<>
			<div
				className={styles['tooltip']}
				onMouseOver={() => toggle(true)}
				onMouseOut={() => toggle(false)}
			>
				{children}
				<span
					className={[
						styles['tooltip-text'],
						styles[placement],
						arrow && styles[`${placement}-arrow`],
					].join(' ')}
					style={{
						visibility: tooltipOpen ? 'visible' : 'hidden',
						...customCSS,
					}}
				>
					{text}
				</span>
			</div>
		</>
	);
}

Tooltip.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
	placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
	arrow: PropTypes.bool,
	text: PropTypes.string.isRequired,
	customCSS: PropTypes.object,
};

Tooltip.defaultProps = {
	placement: 'right',
	arrow: true,
};

export default Tooltip;
