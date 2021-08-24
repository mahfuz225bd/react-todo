import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
	ButtonDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Button,
} from 'reactstrap';

function FilterDate({ value, setValue, disabled }) {
	const [filterDateOpen, setFilterDateOpen] = useState(false);
	const togglefilterDate = () => setFilterDateOpen(!filterDateOpen);

	return (
		<>
			<ButtonDropdown isOpen={filterDateOpen} toggle={togglefilterDate}>
				<Button
					id="caret"
					color="primary"
					size="sm"
					data-tip="Filter: All days"
					active={value === 'all'}
					onClick={() => setValue('all')}
					outline
					disabled={disabled}
				>
					All
				</Button>
				<DropdownToggle
					split
					color="primary"
					size="sm"
					data-tip="Filter by Date"
					outline
					disabled={disabled}
				/>
				<DropdownMenu>
					<DropdownItem
						active={value === 'today'}
						onClick={() => setValue('today')}
					>
						Today
					</DropdownItem>
					<DropdownItem
						active={value === 'last7Days'}
						onClick={() => setValue('last7Days')}
					>
						Last 7 days
					</DropdownItem>
					<DropdownItem
						active={value === 'last15Days'}
						onClick={() => setValue('last15Days')}
					>
						Last 15 days
					</DropdownItem>
					<DropdownItem
						active={value === 'thisMonth'}
						onClick={() => setValue('thisMonth')}
					>
						This month
					</DropdownItem>
				</DropdownMenu>
			</ButtonDropdown>
		</>
	);
}

FilterDate.propTypes = {
	value: PropTypes.string.isRequired,
	setValue: PropTypes.func.isRequired,
};

export default FilterDate;
