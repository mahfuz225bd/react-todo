import React from 'react';
import PropTypes from 'prop-types';

import { ButtonGroup, Button } from 'reactstrap';

function FilterStatus({ value, setValue }) {
	return (
		<>
			<ButtonGroup className="d-inline" size="sm">
				<Button
					color="primary"
					data-tip="Filter: All"
					active={value === 'all'}
					onClick={() => setValue('all')}
					outline
				>
					All
				</Button>
				<Button
					color="primary"
					data-tip="Filter: Pending"
					active={value === 'pending'}
					onClick={() => setValue('pending')}
					outline
				>
					Pending
				</Button>
				<Button
					color="primary"
					data-tip="Filter: Running"
					active={value === 'running'}
					onClick={() => setValue('running')}
					outline
				>
					Running
				</Button>
				<Button
					color="primary"
					data-tip="Filter: Completed"
					active={value === 'completed'}
					onClick={() => setValue('completed')}
					outline
				>
					Completed
				</Button>
			</ButtonGroup>
		</>
	);
}

FilterStatus.propTypes = {
	value: PropTypes.string.isRequired,
	setValue: PropTypes.func.isRequired,
};

export default FilterStatus;
