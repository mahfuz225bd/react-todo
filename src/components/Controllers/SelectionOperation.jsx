import PropTypes from 'prop-types';
import React, { useState } from 'react';

import {
	ButtonGroup,
	ButtonDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';

function SelectionOperation({
	data,
	filterStatusValue,
	performMultiSelection,
	performSelectionOperation,
}) {
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
						disabled={data.length === 0}
						caret
					>
						<i className="far fa-check-square" aria-hidden="true"></i> Select
					</DropdownToggle>
					<DropdownMenu>
						<DropdownItem onClick={() => performMultiSelection(data, 'all')}>
							All
						</DropdownItem>
						<DropdownItem
							onClick={() => performMultiSelection(data, 'notStarted')}
							disabled={
								filterStatusValue !== 'all' ||
								!data.some((each) => each.started === false)
							}
						>
							Not Started
						</DropdownItem>
						<DropdownItem
							onClick={() => performMultiSelection(data, 'running')}
							disabled={
								filterStatusValue !== 'all' ||
								!data.some(
									(each) => each.started === true && each.completed === false
								)
							}
						>
							Running
						</DropdownItem>
						<DropdownItem
							onClick={() => performMultiSelection(data, 'completed')}
							disabled={
								filterStatusValue !== 'all' ||
								!data.some(
									(each) => each.started === true && each.completed === true
								)
							}
						>
							Completed
						</DropdownItem>
						<DropdownItem divider />
						<DropdownItem
							onClick={() => performMultiSelection(data, 'unselectAll')}
							disabled={!data.some((each) => each.selected === true)}
						>
							Unselect All
						</DropdownItem>
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
							onClick={() => performSelectionOperation(data, 'startAll')}
							// If any selected item, ready to start
							disabled={
								!data.some(
									(each) => each.selected === true && each.started === false
								)
							}
						>
							Start
						</DropdownItem>
						<DropdownItem
							onClick={() => performSelectionOperation(data, 'completeAll')}
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
							Complete
						</DropdownItem>
						<DropdownItem
							onClick={() => performSelectionOperation(data, 'incompleteAll')}
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
							Incomplete
						</DropdownItem>
						<DropdownItem divider />
						<DropdownItem
							className="text-danger"
							onClick={() => performSelectionOperation(data, 'deleteAll')}
						>
							<i className="fas fa-trash" aria-hidden="true"></i> Delete
						</DropdownItem>
					</DropdownMenu>
				</ButtonDropdown>
			</ButtonGroup>
		</>
	);
}

SelectionOperation.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
	filterStatusValue: PropTypes.string.isRequired,
	performMultiSelection: PropTypes.func.isRequired,
	performSelectionOperation: PropTypes.func.isRequired,
};

export default SelectionOperation;
