import React from 'react';
import PropTypes from 'prop-types';

import { ButtonGroup, Button } from 'reactstrap';

function ChangeView({ currView, changeView, disabled }) {
	return (
		<>
			<ButtonGroup size="sm">
				<Button
					color="dark"
					data-tip="Change view as list"
					onClick={() => changeView('list')}
					active={currView === 'list'}
					outline
					disabled={disabled}
				>
					<i className="fas fa-list" aria-hidden="true"></i> List
				</Button>
				<Button
					color="dark"
					data-tip="Change view as table"
					onClick={() => changeView('table')}
					active={currView === 'table'}
					outline
					disabled={disabled}
				>
					<i className="fas fa-table" aria-hidden="true"></i> Table
				</Button>
			</ButtonGroup>
		</>
	);
}

ChangeView.propTypes = {
	currView: PropTypes.string.isRequired,
	changeView: PropTypes.func.isRequired,
};

export default ChangeView;
