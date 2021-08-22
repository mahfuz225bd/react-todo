import React, { useState } from 'react';

import {
	ButtonGroup,
	ButtonDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';

function SelectionOperation({ data }) {
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
						// If selected any item
						disabled={!data.some((each) => each.selected === true)}
					>
						With Selected
					</DropdownToggle>
					<DropdownMenu>
						<DropdownItem
							// If any selected item, ready to start
							disabled={
								!data.some(
									(each) => each.selected === true && each.started === false
								)
							}
						>
							Start All
						</DropdownItem>
						<DropdownItem
							// If any selected item, ready to complete
							disabled={
								!data.some(
									(each) =>
										each.selected === true &&
										each.started === true &&
										each.completed === false
								)
							}
						>
							Complete All
						</DropdownItem>
						<DropdownItem
							// If any selected item, ready to incomplete
							disabled={
								!data.some(
									(each) =>
										each.selected === true &&
										each.started === true &&
										each.completed === true
								)
							}
						>
							Incomplete All
						</DropdownItem>
						<DropdownItem divider />
						<DropdownItem className="text-danger"> Clear All</DropdownItem>
					</DropdownMenu>
				</ButtonDropdown>
			</ButtonGroup>
		</>
	);
}

export default SelectionOperation;
