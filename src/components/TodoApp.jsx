import React from 'react';

import { Container, Col, Row, Button } from 'reactstrap';
import AddTodoForm from './AddTodoForm';
import ListView from './ListView';
import TableView from './TableView';
import CustomModal from './CustomModal';

const TodoApp = ({ data, newTodo, openAddTodo, onSelect, onChangeStatus }) => {
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
				<Row>
					<Col>
						<TableView
							todos={data}
							onSelect={onSelect}
							onChangeStatus={onChangeStatus}
						/>
						<ListView
							todos={data}
							onSelect={onSelect}
							onChangeStatus={onChangeStatus}
						/>
					</Col>
					{/* Modal: AddTodoForm */}
					<CustomModal
						icon={
							<>
								<i class="fas fa-plus-square" aria-hidden="true"></i>
							</>
						}
						title="Add New Todo"
						isOpen={openAddTodo.isOpen}
						onToggle={openAddTodo.toggle}
						onClose={openAddTodo.reset}
						footerContent={
							<>
								<Button
									color="primary"
									onClick={() => {
										submitAddTodoForm();
										openAddTodo.toggle();
										openAddTodo.reset();
									}}
								>
									<i class="fas fa-plus" aria-hidden="true"></i> Add
								</Button>
								<Button
									color="primary"
									onClick={() => {
										submitAddTodoForm();
										openAddTodo.reset();
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
