import React from 'react';
import PropTypes from 'prop-types';

import CustomModal from '.';

import { Button } from 'reactstrap';
import Tooltip from '../../assets/components/Tooltip/Tooltip';

function Confirm({ isOpen, onToggle, onConfirm, color, children }) {
	return (
		<>
			<CustomModal
				title="Confirm"
				isOpen={isOpen}
				footerContent={
					<>
						<Tooltip placement="bottom" text="Confirm">
							<Button
								color={color}
								onClick={() => {
									onConfirm();
									onToggle();
								}}
							>
								Confirm
							</Button>
						</Tooltip>
					</>
				}
				onToggle={onToggle}
			>
				{children}
			</CustomModal>
		</>
	);
}

Confirm.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onToggle: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired,
	color: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};

Confirm.defaultProps = {
	color: 'primary',
};

export default Confirm;
