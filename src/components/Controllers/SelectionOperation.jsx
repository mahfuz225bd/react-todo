import React, { useState } from 'react';

import {
	ButtonGroup,
	ButtonDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';

function SelectionOperation(props) {
	const [selectOptionsOpen, setSelectOptionsOpen] = useState(false);
	const toggleSelectOptions = () => setSelectOptionsOpen(!selectOptionsOpen);

	const [operationsWSelectedOpen, setOperationsWSelectedOpen] = useState(false);
	const toggleOperationWSelected = () =>
		setOperationsWSelectedOpen(!operationsWSelectedOpen);
	return (
		<>
			<ButtonGroup>
				<ButtonDropdown isOpen={selectOptionsOpen} toggle={toggleSelectOptions}>
					<DropdownToggle
						color="success"
						size="sm"
						data-tip="Select multiple todos"
						caret
					>
						<i className="far fa-check-square" aria-hidden="true"></i> Select
					</DropdownToggle>
					<DropdownMenu>
						<DropdownItem>All</DropdownItem>
						<DropdownItem>Not Started</DropdownItem>
						<DropdownItem>Running</DropdownItem>
						<DropdownItem>Completed</DropdownItem>
					</DropdownMenu>
				</ButtonDropdown>
				{/* Operations \w Selected todos */}
				<ButtonDropdown
					isOpen={operationsWSelectedOpen}
					toggle={toggleOperationWSelected}
				>
					<DropdownToggle
						color="success"
						size="sm"
						data-tip="Operation with selected todos"
						caret
						disabled
					>
						With Selected
					</DropdownToggle>
					<DropdownMenu>
						<DropdownItem>Start All</DropdownItem>
						<DropdownItem>Complete All</DropdownItem>
						<DropdownItem>Incomplete All</DropdownItem>
						<DropdownItem divider />
						<DropdownItem className="text-danger"> Clear All</DropdownItem>
					</DropdownMenu>
				</ButtonDropdown>
			</ButtonGroup>
		</>
	);
}

export default SelectionOperation;
