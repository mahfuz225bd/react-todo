import React from 'react';
import PropTypes from 'prop-types';

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import Tooltip from '../../assets/components/Tooltip/Tooltip';

function CustomModal({
	icon,
	title,
	isOpen,
	onToggle,
	onKeyDown,
	footerContent,
	children,
}) {
	return (
		<div className="d-inline-block" onKeyDown={(event) => onKeyDown(event)}>
			<Modal isOpen={isOpen} toggle={onToggle}>
				<ModalHeader
					close={
						<Tooltip text="Close (ESC)">
							<button className="btn-close" onClick={() => onToggle()}>
								&times;
							</button>
						</Tooltip>
					}
				>
					{icon} {title}
				</ModalHeader>
				<ModalBody>{children}</ModalBody>
				<ModalFooter>
					{footerContent}
					<Tooltip text="Cancel (ESC)">
						<Button color="secondary" onClick={() => onToggle()}>
							Cancel
						</Button>
					</Tooltip>
				</ModalFooter>
			</Modal>
		</div>
	);
}

CustomModal.propTypes = {
	icon: PropTypes.node,
	title: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	onToggle: PropTypes.func.isRequired,
	onKeyDown: PropTypes.func,
	footerContent: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};

export default CustomModal;
