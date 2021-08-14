import React from 'react';
import ReactTooltip from 'react-tooltip';

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
						className="d-flex justify-content-between align-items-start"
						key={index}
					>
						<CustomInput
							id="chkSelect"
							type="checkbox"
							className="align-self-center"
							data-tip="Select todo"
							data-place="right"
							checked={todo.selected}
							onChange={onSelect}
						/>
						<div className="me-auto ms-2">
							<ListGroupItemHeading>{todo.title}</ListGroupItemHeading>
							<ListGroupItemText className="text-muted">
								{todo.date}
							</ListGroupItemText>
						</div>
						<div className="align-self-center">
							{todo.started && !todo.completed ? (
								<Button
									color="success"
									data-tip="Incomplete, click to mark as complete"
									data-place="left"
									onClick={onStart}
								>
									Running
								</Button>
							) : todo.started && todo.completed ? (
								<Button
									color="danger"
									data-tip="Completed, click to mark as incomplete"
									data-place="left"
									onClick={onComplete}
								>
									Completed
								</Button>
							) : (
								<Button
									color="primary"
									data-tip="Start task"
									data-place="left"
									onClick={onIncomplete}
								>
									Start
								</Button>
							)}
						</div>
						<ReactTooltip />
					</ListGroupItem>
				))}
			</ListGroup>
		</div>
	);
}

export default ListView;
