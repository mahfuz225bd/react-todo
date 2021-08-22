import React from 'react';
import PropTypes from 'prop-types';

import { Table, CustomInput, Button } from 'reactstrap';

function TableView({ todos, onSelect, onChangeStatus }) {
	return (
		<div>
			{todos.length ? (
				<Table striped bordered hover size="sm">
					<thead>
						<tr>
							<th>#</th>
							<th>Todo</th>
							<th>Created Date</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{todos.map((todo, index) => (
							<tr
								key={index}
								className={`${todo.selected && 'bg-dark bg-opacity-10'}`}
							>
								<td>
									<CustomInput
										id="chkSelect"
										type="checkbox"
										className="ps-1"
										style={{
											transform: 'scale(2)',
											width: '25px',
											textAlign: 'center',
											verticalAlign: 'middle',
											borderRadius: '0px',
										}}
										data-tip="Select todo"
										data-place="right"
										checked={todo.selected}
										onChange={() => onSelect(todo.id)}
									/>
								</td>
								<td>{todo.title}</td>
								<td>{todo.datetime}</td>
								<td>
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
								</td>
							</tr>
						))}
					</tbody>
				</Table>
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
			id: PropTypes.number,
			title: PropTypes.string.isRequired,
			description: PropTypes.string,
			datetime: PropTypes.string.isRequired,
			started: PropTypes.bool.isRequired,
			completed: PropTypes.bool.isRequired,
		})
	).isRequired,
	onSelect: PropTypes.func.isRequired,
	onChangeStatus: PropTypes.func.isRequired,
};

export default TableView;
