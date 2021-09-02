import PropTypes from 'prop-types';
import React, { useState } from 'react';

import {
	ButtonGroup,
	ButtonDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';

import Confirm from '../CustomModal/Confirm';

function SelectionOperation({
	data,
	filterStatusValue,
	performMultiSelection,
	performSelectionOperation,
}) {
	const selectedTodos = data.filter((each) => each.selected);

	const [selectOptionsOpen, setSelectOptionsOpen] = useState(false);
	const toggleSelectOptions = () => setSelectOptionsOpen(!selectOptionsOpen);

	const [operationsWSelectedOpen, setOperationsWSelectedOpen] = useState(false);
	const toggleOperationWSelected = () =>
		setOperationsWSelectedOpen(!operationsWSelectedOpen);

	const [confirmStart, setConfirmStart] = useState(false);
	const toggleConfirmStart = () => setConfirmStart(!confirmStart);

	const [confirmComplete, setConfirmComplete] = useState(false);
	const toggleConfirmComplete = () => setConfirmComplete(!confirmComplete);

	const [confirmIncomplete, setConfirmIncomplete] = useState(false);
	const toggleConfirmIncomplete = () =>
		setConfirmIncomplete(!confirmIncomplete);

	const [confirmDeleteAll, setConfirmDeleteAll] = useState(false);
	const toggleConfirmDeleteAll = () => setConfirmDeleteAll(!confirmDeleteAll);

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
							onClick={toggleConfirmStart}
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
							onClick={toggleConfirmComplete}
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
							onClick={toggleConfirmIncomplete}
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
							onClick={toggleConfirmDeleteAll}
						>
							<i className="fas fa-trash-alt" aria-hidden="true"></i> Delete All
						</DropdownItem>
					</DropdownMenu>
				</ButtonDropdown>
			</ButtonGroup>
			{/* Confirm: Start */}
			<Confirm
				isOpen={confirmStart}
				onToggle={toggleConfirmStart}
				onConfirm={() => performSelectionOperation(data, 'startAll')}
			>
				Are you confirm to <i>start</i>{' '}
				<strong>
					{(selectedTodos.length === 1 &&
						`${selectedTodos[0].title} (Record ID=${selectedTodos[0].id})`) ||
						`${selectedTodos.length} todos(s)`}
				</strong>
				?
			</Confirm>
			{/* Confirm: Complete */}
			<Confirm
				isOpen={confirmComplete}
				onToggle={toggleConfirmComplete}
				onConfirm={() => performSelectionOperation(data, 'completeAll')}
			>
				Are you confirm to <i>complete</i>{' '}
				<strong>
					{(selectedTodos.length === 1 &&
						`${selectedTodos[0].title} (Record ID=${selectedTodos[0].id})`) ||
						`${selectedTodos.length} todos(s)`}
				</strong>
				?
			</Confirm>
			{/* Confirm: Incomplete */}
			<Confirm
				isOpen={confirmIncomplete}
				onToggle={toggleConfirmIncomplete}
				onConfirm={() => performSelectionOperation(data, 'incompleteAll')}
			>
				Are you confirm to <i>Incomplete</i>{' '}
				<strong>
					{(selectedTodos.length === 1 &&
						`${selectedTodos[0].title} (Record ID=${selectedTodos[0].id})`) ||
						`${selectedTodos.length} todos(s)`}
				</strong>
				?
			</Confirm>
			{/* Confirm: Delete All */}
			<Confirm
				isOpen={confirmDeleteAll}
				onToggle={toggleConfirmDeleteAll}
				color="danger"
				onConfirm={() => performSelectionOperation(data, 'deleteAll')}
			>
				Are you confirm to <i>delete</i>{' '}
				<strong>
					{(selectedTodos.length === 1 &&
						`${selectedTodos[0].title} (Record ID=${selectedTodos[0].id})`) ||
						`${selectedTodos.length} todos(s)`}
				</strong>
				?
			</Confirm>
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
