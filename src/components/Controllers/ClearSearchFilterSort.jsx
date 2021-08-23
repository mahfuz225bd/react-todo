import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';

function ClearSearchFilterSort({ stateValues, action }) {
	const target = JSON.stringify({
		searchValue: '',
		filterStatus: 'all',
		filterDate: 'all',
		sort: 'latest',
	});

	return (
		<>
			<Button
				color="primary"
				onClick={action}
				disabled={JSON.stringify(stateValues) === target}
				data-tip="Clear Search/Filter/Sort"
				size="sm"
				outline
			>
				Clear
			</Button>
		</>
	);
}

ClearSearchFilterSort.propTypes = {
	stateValues: PropTypes.object.isRequired,
	action: PropTypes.func.isRequired,
};

export default ClearSearchFilterSort;
