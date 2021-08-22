import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
	InputGroup,
	Input,
	InputGroupButtonDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';

function SearchPanel({ searchValue, onChangeSearchValue }) {
	const [advSearchDropdownOpen, setAdvSearchDropdownOpen] = useState(false);
	const toggleAdvSearchDropdown = () =>
		setAdvSearchDropdownOpen(!advSearchDropdownOpen);

	return (
		<>
			<InputGroup>
				<Input
					className="rounded-0"
					placeholder="Search todo..."
					value={searchValue}
					onChange={onChangeSearchValue}
				/>
				<InputGroupButtonDropdown
					addonType="append"
					isOpen={advSearchDropdownOpen}
					toggle={toggleAdvSearchDropdown}
				>
					<DropdownToggle
						className="rounded-0"
						data-tip="Advanced search options"
						outline
						caret
					>
						<i className="fa fa-search-plus" aria-hidden="true"></i>{' '}
						<span>Advanced Search</span>
					</DropdownToggle>
					<DropdownMenu>
						<DropdownItem>by All Fields</DropdownItem>
						<DropdownItem>by All Calendar</DropdownItem>
						<DropdownItem>by All Date Range</DropdownItem>
					</DropdownMenu>
				</InputGroupButtonDropdown>
			</InputGroup>
		</>
	);
}

SearchPanel.propTypes = {
	searchValue: PropTypes.string.isRequired,
	onChangeSearchValue: PropTypes.func.isRequired,
};

export default SearchPanel;
