import React from 'react';
import PropTypes from 'prop-types';

import formattedDateTime from '../assets/js/formattedDateTime';

import {
	Button,
	ButtonGroup,
	CustomInput,
	ListGroup,
	ListGroupItem,
	ListGroupItemHeading,
	ListGroupItemText,
} from 'reactstrap';

function ListView({
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
				<ListGroup>
					{todos.map((todo, index) => (
						<ListGroupItem
							className={`d-flex justify-content-start align-items-start user-select-none ${
								todo.selected && 'bg-dark bg-opacity-10'
							}`}
							key={index}
							action
						>
							<CustomInput
								id="chkSelect"
								type="checkbox"
								className="align-self-center"
								style={{ transform: 'scale(2)' }}
								data-tip="Select todo"
								data-place="right"
								checked={todo.selected}
								onChange={() => onSelect(todo.id)}
							/>
							<div className="ms-3">
								<ListGroupItemHeading>{todo.title}</ListGroupItemHeading>
								<ListGroupItemText className="text-muted">
									{formattedDateTime(todo.datetime)}
								</ListGroupItemText>
							</div>
							<div className="ms-auto pe-1 align-self-center">
								{todo.started && !todo.completed ? (
									<Button
										color="success"
										className="rounded-0 w-100"
										data-tip="Incomplete, click to mark as complete"
										data-place="left"
										onClick={() => onChangeStatus(todo.id, 'complete')}
									>
										Running
									</Button>
								) : todo.started && todo.completed ? (
									<Button
										color="danger"
										className="rounded-0 w-100"
										data-tip="Completed, click to mark as incomplete"
										data-place="left"
										onClick={() => onChangeStatus(todo.id, 'incomplete')}
									>
										Completed
									</Button>
								) : (
									<Button
										color="primary"
										className="rounded-0 w-100"
										data-tip="Start task"
										data-place="left"
										onClick={() => onChangeStatus(todo.id, 'start')}
									>
										Start
									</Button>
								)}
							</div>
							<ButtonGroup className="align-self-center">
								<Button
									color="primary"
									className="rounded-0"
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
									onClick={() => {
										editTodo.setEditTodo(todo.id);
										editTodo.modal.toggle();
									}}
								>
									<i className="fas fa-edit" aria-hidden="true"></i>{' '}
									<span className="d-none d-md-inline">Edit</span>
								</Button>
								<Button
									color="danger"
									className="rounded-0"
									onClick={() => {
										deleteTodo.setDeleteTodo(todo.id);
										deleteTodo.modal.toggle();
									}}
								>
									<i className="fas fa-minus-circle" aria-hidden="true"></i>{' '}
									<span className="d-none d-md-inline">Delete</span>
								</Button>
							</ButtonGroup>
						</ListGroupItem>
					))}
				</ListGroup>
			) : (
				<p>There is no data to show</p>
			)}
		</div>
	);
}

ListView.propTypes = {
	deleteTodo: PropTypes.shape({
		modal: PropTypes.shape({
			toggle: PropTypes.func.isRequired,
		}),
		setDeleteTodo: PropTypes.func.isRequired,
	}).isRequired,
	editTodo: PropTypes.shape({
		modal: PropTypes.shape({
			toggle: PropTypes.func.isRequired,
		}),
		setEditTodo: PropTypes.func.isRequired,
	}).isRequired,
	onChangeStatus: PropTypes.func.isRequired,
	onSelect: PropTypes.func.isRequired,
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
	viewTodo: PropTypes.shape({
		modal: PropTypes.shape({
			toggle: PropTypes.func.isRequired,
		}),
		setViewTodo: PropTypes.func.isRequired,
	}).isRequired,
};

export default ListView;
