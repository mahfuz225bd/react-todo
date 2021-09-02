import React from 'react';
import PropTypes from 'prop-types';

import formattedDateTime from '../assets/js/formattedDateTime';

import { Container, Col, Row, Button, Table, Form } from 'reactstrap';
import Controllers from './Controllers';
import DataView from './DataView';
import CustomModal from './CustomModal';
import AddTodoForm from './AddTodoForm';
import EditTodoForm from './EditTodoForm';

import Tooltip from '../assets/components/Tooltip/Tooltip';

const TodoApp = ({
	data,
	newTodo,
	controllers,
	onSelect,
	onChangeStatus,
	viewTodo,
	editTodo,
	deleteTodo,
}) => {
	const submitAddTodoForm = () => {
		document.querySelector('#addTodo button[type=submit]').click();
	};

	const submitEditTodoForm = () => {
		document.querySelector('#editTodo button[type=submit]').click();
	};

	const submitDeleteTodoForm = () => {
		document.querySelector('#deleteTodo button[type=submit]').click();
	};

	return (
		<>
			<Container className="px-2 px-md-5 mb-5">
				<Row className="my-3 my-md-5">
					<h2 className="display-4 text-center">React Todo App</h2>
				</Row>
				{/* Controllers */}
				<Row className="mb-1">
					<Controllers
						controllers={controllers}
						disabled={controllers.disabled}
					/>
				</Row>
				{/* Data View */}
				<Row>
					<Col>
						<DataView
							currView={controllers.dataView.currView}
							data={data}
							onSelect={onSelect}
							onChangeStatus={onChangeStatus}
							viewTodo={viewTodo}
							editTodo={editTodo}
							deleteTodo={deleteTodo}
						/>
					</Col>
				</Row>
			</Container>

			{/* Modal: AddTodo */}
			<CustomModal
				icon={
					<>
						<i className="fas fa-plus-square" aria-hidden="true"></i>
					</>
				}
				title="Add New Todo"
				isOpen={controllers.openAddTodo.isOpen}
				onToggle={controllers.openAddTodo.toggle}
				onKeyDown={(event) => {
					if (event.ctrlKey && event.keyCode === 13) {
						document.getElementById('btnAddTodo').click();
					}
				}}
				footerContent={
					<>
						<Tooltip
							placement="bottom"
							text="Add (Ctrl + enter)"
							customCSS={{ width: '145px' }}
						>
							<Button
								color="primary"
								id="btnAddTodo"
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
						</Tooltip>

						<Tooltip placement="bottom" text="Add (Enter)">
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
						</Tooltip>
					</>
				}
			>
				<AddTodoForm
					newTodoObj={newTodo.newTodoObj}
					onChangeInput={newTodo.onChangeInput}
					onSubmit={newTodo.add}
				/>
			</CustomModal>
			{/* Modal: ViewTodo */}
			<CustomModal
				icon={
					<>
						<i className="fas fa-search" aria-hidden="true"></i>
					</>
				}
				title="View Todo"
				isOpen={viewTodo.modal.isOpen}
				onToggle={viewTodo.modal.toggle}
				onKeyDown={(event) => {
					if (event.keyCode === 13) {
						viewTodo.modal.toggle();
					}
				}}
				footerContent={
					<>
						<Tooltip placement="bottom" text="OK (Enter)">
							<Button
								color="primary"
								onClick={() => {
									viewTodo.modal.toggle();
								}}
							>
								OK
							</Button>
						</Tooltip>
					</>
				}
			>
				<Table>
					<colgroup>
						<col width="110" />
						<col />
					</colgroup>
					<tbody>
						<tr>
							<th>ID#</th>
							<td>{viewTodo.viewTodoObj.id}</td>
						</tr>
						<tr>
							<th>Task Name</th>
							<td>{viewTodo.viewTodoObj.title}</td>
						</tr>
						<tr>
							<th>Date/Time</th>
							<td>{formattedDateTime(viewTodo.viewTodoObj.datetime)}</td>
						</tr>
						<tr>
							<th>Description</th>
							<td>{viewTodo.viewTodoObj.description}</td>
						</tr>
						<tr>
							<th>Status</th>
							<td
								className={`${
									viewTodo.viewTodoObj.status === 'Running'
										? 'text-success'
										: viewTodo.viewTodoObj.status === 'Completed'
										? 'text-danger'
										: ''
								} fw-bold`}
							>
								{viewTodo.viewTodoObj.status}
							</td>
						</tr>
					</tbody>
				</Table>
			</CustomModal>
			{/* Modal: EditTodo */}
			<CustomModal
				icon={
					<>
						<i className="fas fa-edit" aria-hidden="true"></i>
					</>
				}
				title="Edit Todo"
				isOpen={editTodo.modal.isOpen}
				onToggle={editTodo.modal.toggle}
				onKeyDown={(event) => {
					if (event.keyCode === 13) {
						document.getElementById('btnUpdateTodo').click();
					}
				}}
				footerContent={
					<>
						<Tooltip placement="bottom" text="Update (Enter)">
							<Button
								color="primary"
								id="btnUpdateTodo"
								onClick={() => {
									submitEditTodoForm();
									editTodo.modal.toggle();
								}}
							>
								Update
							</Button>
						</Tooltip>
					</>
				}
			>
				<EditTodoForm
					editTodoObj={editTodo.editTodoObj}
					onChangeInput={editTodo.onChangeInput}
					onSubmit={editTodo.update}
				/>
			</CustomModal>
			{/* Modal: DeleteTodo */}
			<CustomModal
				icon={
					<>
						<i className="fas fa-trash" aria-hidden="true"></i>
					</>
				}
				title="Delete Todo"
				isOpen={deleteTodo.modal.isOpen}
				onToggle={deleteTodo.modal.toggle}
				onKeyDown={(event) => {
					if (event.keyCode === 13) {
						document.getElementById('btnDeleteTodo').click();
					}
				}}
				footerContent={
					<>
						<Tooltip placement="bottom" text="Delete (Enter)">
							<Button
								color="danger"
								id="btnDeleteTodo"
								onClick={() => {
									submitDeleteTodoForm();
									deleteTodo.modal.toggle();
								}}
							>
								Delete
							</Button>
						</Tooltip>
					</>
				}
			>
				<Form id="deleteTodo" onSubmit={deleteTodo.delete}>
					Are you confirm to delete{' '}
					<strong>
						{deleteTodo.deleteTodoObj.title} (ID={deleteTodo.deleteTodoObj.id})
					</strong>
					. To delete, click on <strong>Delete</strong> or press{' '}
					<kbd>Enter</kbd>.<button type="submit" className="d-none"></button>
				</Form>
			</CustomModal>
		</>
	);
};

TodoApp.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
	onSelect: PropTypes.func.isRequired,
	onChangeStatus: PropTypes.func.isRequired,

	controllers: PropTypes.object.isRequired,

	newTodo: PropTypes.shape({
		add: PropTypes.func.isRequired,
		newTodoObj: PropTypes.object.isRequired,
		onChangeInput: PropTypes.func.isRequired,
	}).isRequired,

	viewTodo: PropTypes.shape({
		viewTodoObj: PropTypes.object.isRequired,
		modal: PropTypes.shape({
			isOpen: PropTypes.bool.isRequired,
			toggle: PropTypes.func.isRequired,
		}).isRequired,
	}).isRequired,

	editTodo: PropTypes.shape({
		editTodoObj: PropTypes.object.isRequired,
		onChangeInput: PropTypes.func.isRequired,
		update: PropTypes.func.isRequired,
		modal: PropTypes.shape({
			isOpen: PropTypes.bool.isRequired,
			toggle: PropTypes.func.isRequired,
		}).isRequired,
	}).isRequired,

	deleteTodo: PropTypes.shape({
		deleteTodoObj: PropTypes.object.isRequired,
		modal: PropTypes.shape({
			isOpen: PropTypes.bool.isRequired,
			toggle: PropTypes.func.isRequired,
		}).isRequired,
		delete: PropTypes.func.isRequired,
	}).isRequired,
};

export default TodoApp;
