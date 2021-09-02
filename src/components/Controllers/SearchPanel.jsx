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

function SearchPanel({ searchValue, onChangeSearchValue, disabled }) {
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
					disabled={disabled}
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
						disabled={disabled}
					>
						<i className="fa fa-search-plus" aria-hidden="true"></i> Advanced
						Search
					</DropdownToggle>
					<DropdownMenu>
						<DropdownItem
							onClick={() =>
								alert(
									'Feature: Advanced Search (by Calendar) is not currently available.'
								)
							}
						>
							<i className="fas fa-calendar-day" aria-hidden="true"></i> by
							Calendar
						</DropdownItem>
						<DropdownItem
							onClick={() =>
								alert(
									'Feature: Advanced Search (by Date Range) is not currently available.'
								)
							}
						>
							<i className="fas fa-calendar-alt" aria-hidden="true"></i> by Date
							Range
						</DropdownItem>
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
