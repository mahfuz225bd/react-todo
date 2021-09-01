import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';

function ClearSearchFilterSort({ stateValues, action, disabled }) {
	const targetToHide = JSON.stringify({
		searchValue: '',
		filterStatus: 'all',
		filterDate: 'all',
		sort: 'latest',
	});

	const getTooltipText = () => {
		const values = [];

		if (stateValues.searchValue) {
			values.push('SearchValue: ' + stateValues.searchValue);
		}

		if (stateValues.filterStatus !== 'all') {
			values.push('FilterStatus: ' + stateValues.filterStatus);
		}

		if (stateValues.filterDate !== 'all') {
			values.push('FilterDate: ' + stateValues.filterDate);
		}

		if (stateValues.sort !== 'latest') {
			values.push('Sort: ' + stateValues.sort);
		}

		return 'Clear => ' + values.join(', ');
	};

	return (
		<>
			<Button
				color="danger"
				onClick={action}
				hidden={JSON.stringify(stateValues) === targetToHide}
				data-tip={getTooltipText()}
				size="sm"
				disabled={disabled}
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
