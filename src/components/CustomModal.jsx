import React from 'react';
import PropTypes from 'prop-types';

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

function CustomModal({
	icon,
	title,
	isOpen,
	onToggle,
	onClose,
	footerContent,
	children,
}) {
	return (
		<div>
			<Modal isOpen={isOpen} toggle={onToggle}>
				<ModalHeader
					close={
						<button
							className="btn-close"
							onClick={() => {
								onToggle();
								onClose();
							}}
						>
							&times;
						</button>
					}
				>
					{icon} {title}
				</ModalHeader>
				<ModalBody>{children}</ModalBody>
				<ModalFooter>
					{footerContent}
					<Button
						color="secondary"
						onClick={() => {
							onToggle();
							onClose();
						}}
					>
						Cancel
					</Button>
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
	onClose: PropTypes.func,
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
