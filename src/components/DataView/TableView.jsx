import React from 'react';
import PropTypes from 'prop-types';

import { Table, CustomInput, ButtonGroup, Button } from 'reactstrap';

import formattedDateTime from '../../assets/js/formattedDateTime';

function TableView({
	todos,
	onSelect,
	onChangeStatus,
	viewTodo,
	editTodo,
	deleteTodo,
}) {
	return (
		<div>
			{todos.length ? (
				<>
					<Table size="sm" striped bordered hover>
						<colgroup>
							<col style={{ width: '42px' }} />
							<col />
							<col style={{ width: '210px', minWidth: '210px' }} />
							<col style={{ width: '105px' }} />
							<col style={{ width: '210px' }} />
						</colgroup>
						<thead>
							<tr>
								<th>#</th>
								<th>Todo</th>
								<th>Created Date</th>
								<th>Status</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{todos.map((todo, index) => (
								<tr
									key={index}
									className={`${todo.selected && 'table-active'}`}
								>
									<td>
										<CustomInput
											id="chkSelect"
											type="checkbox"
											className="text-center"
											style={{
												transform: 'scale(2)',
												width: '25px',
												textAlign: 'center',
												verticalAlign: 'middle',
											}}
											data-tip="Select todo"
											data-place="right"
											checked={todo.selected}
											onChange={() => onSelect(todo.id)}
										/>
									</td>
									<td>{todo.title}</td>
									<td>{formattedDateTime(todo.datetime)}</td>
									<td>
										{todo.started && !todo.completed ? (
											<Button
												color="success"
												className="rounded-0"
												style={{ width: '105px' }}
												data-tip="Incomplete, click to mark as complete"
												data-place="left"
												size="sm"
												onClick={() => onChangeStatus(todo.id, 'complete')}
											>
												Running
											</Button>
										) : todo.started && todo.completed ? (
											<Button
												color="danger"
												className="rounded-0"
												style={{ width: '105px' }}
												data-tip="Completed, click to mark as incomplete"
												data-place="left"
												size="sm"
												onClick={() => onChangeStatus(todo.id, 'incomplete')}
											>
												Completed
											</Button>
										) : (
											<Button
												color="primary"
												className="rounded-0"
												style={{ width: '105px' }}
												data-tip="Start task"
												data-place="left"
												size="sm"
												onClick={() => onChangeStatus(todo.id, 'start')}
											>
												Start
											</Button>
										)}
									</td>
									<td>
										<ButtonGroup className="align-self-center" size="sm">
											<Button
												color="primary"
												className="rounded-0"
												data-tip="View Details"
												onClick={() => {
													viewTodo.setViewTodo(todo.id);
													viewTodo.modal.toggle();
												}}
											>
												<i className="fas fa-search" aria-hidden="true"></i>{' '}
												<span className="d-none d-md-inline">View</span>
											</Button>
											<Button
												color="secondary"
												className="rounded-0"
												data-tip="Edit Todo"
												onClick={() => {
													editTodo.setEditTodo(todo.id);
													editTodo.modal.toggle();
													setTimeout(() => {
														document.querySelector('#editTodo #title').select();
													});
												}}
											>
												<i className="fas fa-edit" aria-hidden="true"></i>{' '}
												<span className="d-none d-md-inline">Edit</span>
											</Button>
											<Button
												color="danger"
												className="rounded-0"
												data-tip="Delete Todo"
												onClick={() => {
													deleteTodo.setDeleteTodo(todo.id);
													deleteTodo.modal.toggle();
												}}
											>
												<i
													className="fas fa-minus-circle"
													aria-hidden="true"
												></i>{' '}
												<span className="d-none d-md-inline">Delete</span>
											</Button>
										</ButtonGroup>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</>
			) : (
				<p>There is no data to show</p>
			)}
		</div>
	);
}

TableView.propTypes = {
	todos: PropTypes.arrayOf(
		PropTypes.shape({
			selected: PropTypes.bool.isRequired,
			id: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired,
			description: PropTypes.string,
			datetime: PropTypes.string.isRequired,
			started: PropTypes.bool.isRequired,
			completed: PropTypes.bool.isRequired,
		})
	).isRequired,
	onSelect: PropTypes.func.isRequired,
	onChangeStatus: PropTypes.func.isRequired,
	viewTodo: PropTypes.shape({
		modal: PropTypes.shape({
			toggle: PropTypes.func.isRequired,
		}),
		setViewTodo: PropTypes.func.isRequired,
	}).isRequired,
	editTodo: PropTypes.shape({
		modal: PropTypes.shape({
			toggle: PropTypes.func.isRequired,
		}),
		setEditTodo: PropTypes.func.isRequired,
	}).isRequired,
	deleteTodo: PropTypes.shape({
		modal: PropTypes.shape({
			toggle: PropTypes.func.isRequired,
		}),
		setDeleteTodo: PropTypes.func.isRequired,
	}).isRequired,
};

export default TableView;
