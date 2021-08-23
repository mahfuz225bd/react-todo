import React from 'react';
import PropTypes from 'prop-types';

import { Container, Col, Row, Button } from 'reactstrap';
import Controllers from './Controllers';
import ListView from './ListView';
import TableView from './TableView';
import CustomModal from './CustomModal';
import AddTodoForm from './AddTodoForm';

const TodoApp = ({ data, newTodo, controllers, onSelect, onChangeStatus }) => {
	const submitAddTodoForm = () => {
		document.querySelector('#addTodo button[type=submit]').click();
	};

	const getView = () => {
		return controllers.dataView.currView === 'table' ? (
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
		);
	};

	return (
		<>
			<Container className="px-2 px-md-5 mb-5">
				<Row className="my-3 my-md-5">
					<h2 className="display-4 text-center">React Todo App</h2>
				</Row>
				{/* Controllers */}
				<Row className="mb-2">
					<Controllers controllers={controllers} />
				</Row>
				{/* Data View */}
				<Row>
					<Col>{getView()}</Col>
				</Row>
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
									// After submitting, toggle to close addTodoModal
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
									// Focus for the next form input
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
						onSubmit={newTodo.onSubmit}
					/>
				</CustomModal>
			</Container>
		</>
	);
};

TodoApp.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
	newTodo: PropTypes.shape({
		newTodoObj: PropTypes.object.isRequired,
		onChangeInput: PropTypes.func.isRequired,
		onSubmit: PropTypes.func.isRequired,
	}).isRequired,
	controllers: PropTypes.object.isRequired,
	onSelect: PropTypes.func.isRequired,
	onChangeStatus: PropTypes.func.isRequired,
};

export default TodoApp;
