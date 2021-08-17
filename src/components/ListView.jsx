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

function ListView({ todos, onSelect, onStart, onComplete, onIncomplete }) {
	return (
		<div>
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
								{todo.date}
							</ListGroupItemText>
						</div>
						<div className="ms-auto align-self-center">
							{todo.started && !todo.completed ? (
								<Button
									color="success"
									className="rounded-0"
									data-tip="Incomplete, click to mark as complete"
									data-place="left"
									onClick={() => onComplete(todo.id)}
								>
									Running
								</Button>
							) : todo.started && todo.completed ? (
								<Button
									color="danger"
									className="rounded-0"
									data-tip="Completed, click to mark as incomplete"
									data-place="left"
									onClick={() => onIncomplete(todo.id)}
								>
									Completed
								</Button>
							) : (
								<Button
									color="primary"
									className="rounded-0"
									data-tip="Start task"
									data-place="left"
									onClick={() => onStart(todo.id)}
								>
									Start
								</Button>
							)}
						</div>
					</ListGroupItem>
				))}
			</ListGroup>
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
			date: PropTypes.string.isRequired,
			started: PropTypes.bool.isRequired,
			completed: PropTypes.bool.isRequired,
		})
	).isRequired,
	onComplete: PropTypes.func.isRequired,
	onIncomplete: PropTypes.func.isRequired,
	onSelect: PropTypes.func.isRequired,
	onStart: PropTypes.func.isRequired,
};

export default ListView;
