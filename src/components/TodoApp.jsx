import React from 'react';

import { Container, Col, Row, Button, ButtonGroup } from 'reactstrap';
import AddTodoForm from './AddTodoForm';
import ListView from './ListView';
import TableView from './TableView';
import CustomModal from './CustomModal';

const TodoApp = ({ data, newTodo, controllers, onSelect, onChangeStatus }) => {
	const submitAddTodoForm = () => {
		document.querySelector('#addTodo button[type=submit]').click();
	};
	return (
		<>
			<Container>
				<Row>
					<Col className="my-5">
						<h2 className="display-4 text-center">React Todo App</h2>
					</Col>
				</Row>
				{/* Controllers */}
				<Row className="my-2">
					<Col>Filter</Col>
					<Col className="text-center">
						{/* Change Data View */}
						<ButtonGroup>
							<Button
								color="dark"
								onClick={() => controllers.dataView.changeView('list')}
								active={controllers.dataView.currView === 'list'}
								size="sm"
								outline
							>
								<i class="fas fa-list" aria-hidden="true"></i> List
							</Button>
							<Button
								color="dark"
								onClick={() => controllers.dataView.changeView('table')}
								active={controllers.dataView.currView === 'table'}
								size="sm"
								outline
							>
								<i class="fas fa-table" aria-hidden="true"></i> Table
							</Button>
						</ButtonGroup>
					</Col>
					<Col className="text-end">
						{/* Open AddTodoModal */}
						<Button
							color="primary"
							size="sm"
							onClick={() => {
								controllers.openAddTodo.toggle();
								//Focus after opening addTodoModal
								setTimeout(() => {
									document.querySelector('#addTodo #title').focus();
								}, 500);
							}}
						>
							<i class="fa fa-plus" aria-hidden="true"></i> Add
						</Button>
					</Col>
				</Row>
				{/* Data View */}
				<Row>
					<Col>
						{controllers.dataView.currView === 'list' ? (
							<ListView
								todos={data}
								onSelect={onSelect}
								onChangeStatus={onChangeStatus}
							/>
						) : (
							<TableView
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
								<i class="fas fa-plus-square" aria-hidden="true"></i>
							</>
						}
						title="Add New Todo"
						isOpen={controllers.openAddTodo.isOpen}
						onToggle={controllers.openAddTodo.toggle}
						footerContent={
							<>
								<Button
									color="primary"
									onClick={() => {
										submitAddTodoForm();
										//After submitting, toggle to close addTodoModal
										document.forms['addTodo'].addEventListener('submit', () => {
											controllers.openAddTodo.toggle();
										});
									}}
								>
									<i class="fas fa-plus" aria-hidden="true"></i> Add
								</Button>
								<Button
									color="primary"
									onClick={() => {
										submitAddTodoForm();
										//Focus for the next form input
										document.querySelector('#addTodo #title').focus();
									}}
								>
									<i class="fas fa-asterisk" aria-hidden="true"></i> Save {'&'}{' '}
									New
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
