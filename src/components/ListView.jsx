import React from 'react';
import PropTypes from 'prop-types';

import {
	Button,
	CustomInput,
	ListGroup,
	ListGroupItem,
	ListGroupItemHeading,
	ListGroupItemText,
} from 'reactstrap';

function ListView({ todos, onSelect, onChangeStatus }) {
	return (
		<div>
			{todos.length ? (
				<ListGroup>
					{todos.map((todo, index) => (
						<ListGroupItem
							className="d-flex justify-content-start align-items-start"
							key={index}
						>
							<CustomInput
								id="chkSelect"
								type="checkbox"
								className="align-self-center"
								data-tip="Select todo"
								data-place="right"
								checked={todo.selected}
								onChange={() => onSelect(todo.id)}
							/>
							<div className="ms-2">
								<ListGroupItemHeading>{todo.title}</ListGroupItemHeading>
								<ListGroupItemText className="text-muted">
									{todo.datetime}
								</ListGroupItemText>
							</div>
							<div className="ms-auto align-self-center">
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
	todos: PropTypes.arrayOf(
		PropTypes.shape({
			selected: PropTypes.bool.isRequired,
			id: PropTypes.number,
			title: PropTypes.string.isRequired,
			description: PropTypes.string,
			datetime: PropTypes.string.isRequired,
			started: PropTypes.bool.isRequired,
			completed: PropTypes.bool.isRequired,
		})
	).isRequired,
	onSelect: PropTypes.func.isRequired,
	onChangeStatus: PropTypes.func,
};

export default ListView;
