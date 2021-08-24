import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';

function Sort({ value, toggleSort, disabled }) {
	return (
		<>
			{value === 'latest' ? (
				<Button
					color="primary"
					size="sm"
					data-tip="Sort: Oldest"
					onClick={() => toggleSort('oldest')}
					outline
					disabled={disabled}
				>
					<i className="fas fa-sort" aria-hidden="true"></i> Oldest
				</Button>
			) : (
				<Button
					color="primary"
					size="sm"
					data-tip="Sort: Latest"
					onClick={() => toggleSort('latest')}
					outline
					disabled={disabled}
				>
					<i className="fas fa-sort" aria-hidden="true"></i> Latest
				</Button>
			)}
		</>
	);
}

Sort.propTypes = {
	value: PropTypes.string.isRequired,
	toggleSort: PropTypes.func.isRequired,
};

export default Sort;
