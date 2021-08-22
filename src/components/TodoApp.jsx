import React, { useState } from 'react';

import {
	Container,
	Col,
	Row,
	Button,
	ButtonGroup,
	ButtonDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';
import AddTodoForm from './AddTodoForm';
import ListView from './ListView';
import TableView from './TableView';
import CustomModal from './CustomModal';

const TodoApp = ({ data, newTodo, controllers, onSelect, onChangeStatus }) => {
	const submitAddTodoForm = () => {
		document.querySelector('#addTodo button[type=submit]').click();
	};

	const [filterDateOpen, setFilterDateOpen] = useState(false);
	const togglefilterDate = () => setFilterDateOpen(!filterDateOpen);

	const [selectOptionsOpen, setSelectOptionsOpen] = useState(false);
	const toggleSelectOptions = () => setSelectOptionsOpen(!selectOptionsOpen);

	const [operationsWSelectedOpen, setOperationsWSelectedOpen] = useState(false);
	const toggleOperationWSelected = () =>
		setOperationsWSelectedOpen(!operationsWSelectedOpen);

	const [exportFileOpen, setExportFileOpen] = useState(false);
	const toggleExportFile = () => setExportFileOpen(!exportFileOpen);

	return (
		<>
			<Container className="px-2 px-md-5">
				<Row>
					<Col className="my-5">
						<h2 className="display-4 text-center">React Todo App</h2>
					</Col>
				</Row>
				{/* Controllers */}
				<Row className="mb-2">
					<Col>
						{/* Filter */}
						<ButtonGroup className="d-inline" size="sm">
							<Button color="primary" data-tip="Filter: All" outline active>
								All
							</Button>
							<Button color="primary" data-tip="Filter: Pending" outline>
								Pending
							</Button>
							<Button color="primary" data-tip="Filter: Running" outline>
								Running
							</Button>
							<Button color="primary" data-tip="Filter: Completed" outline>
								Completed
							</Button>
						</ButtonGroup>{' '}
						{/* Filter by Date */}
						<ButtonDropdown isOpen={filterDateOpen} toggle={togglefilterDate}>
							<Button
								id="caret"
								color="primary"
								size="sm"
								data-tip="Filter: All days"
							>
								All
							</Button>
							<DropdownToggle
								split
								color="primary"
								size="sm"
								data-tip="Filter by Date"
								outline
							/>
							<DropdownMenu>
								<DropdownItem>Today</DropdownItem>
								<DropdownItem>Last 7 days</DropdownItem>
								<DropdownItem>Last 15 days</DropdownItem>
								<DropdownItem>This month</DropdownItem>
							</DropdownMenu>
						</ButtonDropdown>{' '}
						{/* Sorting */}
						<Button color="primary" size="sm" data-tip="Sort: Oldest" outline>
							<i className="fas fa-sort" aria-hidden="true"></i> Oldest
						</Button>
					</Col>
					<div className="d-block d-md-none clearfix mt-1"></div>
					<Col className="text-md-center">
						{/* Change Data View */}
						<ButtonGroup size="sm">
							<Button
								color="dark"
								data-tip="Change view as list"
								onClick={() => controllers.dataView.changeView('list')}
								active={controllers.dataView.currView === 'list'}
								outline
							>
								<i className="fas fa-list" aria-hidden="true"></i> List
							</Button>
							<Button
								color="dark"
								data-tip="Change view as table"
								onClick={() => controllers.dataView.changeView('table')}
								active={controllers.dataView.currView === 'table'}
								outline
							>
								<i className="fas fa-table" aria-hidden="true"></i> Table
							</Button>
						</ButtonGroup>
					</Col>
					<div className="d-block d-md-none clearfix mt-1"></div>
					<Col className="text-md-end">
						{/* Selection Operation */}
						<ButtonGroup>
							<ButtonDropdown
								isOpen={selectOptionsOpen}
								toggle={toggleSelectOptions}
							>
								<DropdownToggle
									color="success"
									size="sm"
									data-tip="Select multiple todos"
									caret
								>
									<i className="far fa-check-square" aria-hidden="true"></i>{' '}
									Select
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
									<DropdownItem className="text-danger">
										{' '}
										Clear All
									</DropdownItem>
								</DropdownMenu>
							</ButtonDropdown>
						</ButtonGroup>{' '}
						{/* Export */}
						<ButtonDropdown isOpen={exportFileOpen} toggle={toggleExportFile}>
							<DropdownToggle
								color="warning"
								size="sm"
								data-tip="Select multiple todos"
								caret
							>
								<i className="fa fa-file-export" aria-hidden="true"></i> Export
							</DropdownToggle>
							<DropdownMenu>
								<DropdownItem>
									<i className="fas fa-file-excel" aria-hidden="true"></i>{' '}
									Export as Excel
								</DropdownItem>
								<DropdownItem>
									<i className="fas fa-file-csv" aria-hidden="true"></i> Export
									as CSV
								</DropdownItem>
							</DropdownMenu>
						</ButtonDropdown>{' '}
						{/* Open AddTodoModal */}
						<Button
							color="primary"
							data-tip="Create a new todo"
							size="sm"
							onClick={() => {
								controllers.openAddTodo.toggle();
								//Focus after opening addTodoModal
								setTimeout(() => {
									document.querySelector('#addTodo #title').focus();
								}, 500);
							}}
						>
							<i className="fa fa-plus" aria-hidden="true"></i> Add
						</Button>
					</Col>
				</Row>
				{/* Data View */}
				<Row>
					<Col>
						{controllers.dataView.currView === 'table' ? (
							<TableView
								todos={data}
								onSelect={onSelect}
								onChangeStatus={onChangeStatus}
							/>
						) : (
							<ListView
								todos={data}
								onSelect={onSelect}
								onChangeStatus={onChangeStatus}
							/>
						)}
					</Col>
					{/* Modal: AddTodoForm */}
					<CustomModal
						id="addTodoModal"
						icon={
							<>
								<i className="fas fa-plus-square" aria-hidden="true"></i>
							</>
						}
						title="Add New Todo"
						isOpen={controllers.openAddTodo.isOpen}
						onToggle={controllers.openAddTodo.toggle}
						footerContent={
							<>
								<Button
									color="primary"
									data-tip="Add (Ctrl + enter)"
									onClick={() => {
										submitAddTodoForm();
										//After submitting, toggle to close addTodoModal
										if (
											document.querySelector('#addTodo #title[required]').value
										) {
											controllers.openAddTodo.toggle();
										}
									}}
								>
									<i className="fas fa-plus" aria-hidden="true"></i> Add
								</Button>
								<Button
									color="primary"
									onClick={() => {
										submitAddTodoForm();
										//Focus for the next form input
										document.querySelector('#addTodo #title').focus();
									}}
								>
									<i className="fas fa-asterisk" aria-hidden="true"></i> Save{' '}
									{'&'} New
								</Button>
							</>
						}
					>
						<AddTodoForm
							newTodoObj={newTodo.newTodoObj}
							onChangeInput={newTodo.onChangeInput}
							onChangeCheckbox={newTodo.onChangeCheckbox}
							onSubmit={newTodo.onSubmit}
						/>
					</CustomModal>
				</Row>
			</Container>
		</>
	);
};

export default TodoApp;
