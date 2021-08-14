import React from 'react';
import { Table, CustomInput, Button } from 'reactstrap';
import ReactTooltip from 'react-tooltip';

function TableView({ todos, onSelect, onStart, onComplete, onIncomplete }) {
	return (
		<div>
			<Table>
				<thead>
					<tr>
						<th>#</th>
						<th>Todo</th>
						<th>Created Date</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{todos.map((todo) => (
						<tr>
							<th>
								<CustomInput
									id="chkSelect"
									type="checkbox"
									className="align-self-center"
									data-tip="Select todo"
									data-place="right"
									checked={todo.selected}
									onChange={() => onSelect(todo.id)}
								/>
							</th>
							<td>{todo.title}</td>
							<td>{todo.date}</td>
							<td>
								{todo.started && !todo.completed ? (
									<Button
										color="success"
										data-tip="Incomplete, click to mark as complete"
										data-place="left"
										onClick={() => onComplete(todo.id)}
									>
										Running
									</Button>
								) : todo.started && todo.completed ? (
									<Button
										color="danger"
										data-tip="Completed, click to mark as incomplete"
										data-place="left"
										onClick={() => onIncomplete(todo.id)}
									>
										Completed
									</Button>
								) : (
									<Button
										color="primary"
										data-tip="Start task"
										data-place="left"
										onClick={() => onStart(todo.id)}
									>
										Start
									</Button>
								)}
							</td>
						</tr>
					))}
				</tbody>
				<ReactTooltip />
			</Table>
		</div>
	);
}

export default TableView;
