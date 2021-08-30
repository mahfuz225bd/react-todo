import React from 'react';
import PropTypes from 'prop-types';

import { Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

import getDateTimeValue from '../assets/js/getDateStringForHTMLInput';

const Required = () => (
	<span style={{ color: 'red', fontWeight: 'bold' }}>*</span>
);

function EditTodoForm({ editTodoObj, onChangeInput, onSubmit }) {
	return (
		<div>
			<Form id="addTodo" autoComplete="off">
				<FormGroup className="mb-2" row>
					<Label for="title" sm={3}>
						Task Name <Required />
					</Label>
					<Col>
						<Input
							type="text"
							name="title"
							id="title"
							placeholder="Task Name"
							value={editTodoObj.title}
							onChange={onChangeInput}
							required
						/>
					</Col>
				</FormGroup>
				<FormGroup className="mb-2" row>
					<Label for="datetime" sm={3}>
						Date/Time <Required />
					</Label>
					<Col>
						<Input
							type="datetime-local"
							name="datetime"
							id="datetime"
							placeholder="Date/Time"
							value={getDateTimeValue(editTodoObj.datetime)}
							onChange={onChangeInput}
							required
						/>
					</Col>
				</FormGroup>
				<FormGroup className="mb-2" row>
					<Label for="description" sm={3}>
						Description
					</Label>
					<Col>
						<Input
							type="textarea"
							name="description"
							id="description"
							placeholder="Some about the task"
							value={editTodoObj.description}
							onChange={onChangeInput}
							spellCheck={false}
						/>
					</Col>
				</FormGroup>
				<FormGroup className="mb-2" row>
					<Label for="status" sm={3}>
						Status
					</Label>
					<Col>
						<Input
							type="checkbox"
							className="d-none"
							id="chk_started"
							name="started"
							checked={editTodoObj.started}
							onChange={onChangeInput}
						/>
						<Input
							type="checkbox"
							className="d-none"
							id="chk_completed"
							name="completed"
							checked={editTodoObj.completed}
							onChange={onChangeInput}
						/>
						{editTodoObj.started && !editTodoObj.completed ? (
							<Button
								color="success"
								className="rounded-0"
								data-tip="Incomplete, click to mark as complete"
								data-place="left"
								onClick={() => {
									document.getElementById('chk_completed').click();
								}}
							>
								Running
							</Button>
						) : editTodoObj.started && editTodoObj.completed ? (
							<Button
								color="danger"
								className="rounded-0"
								data-tip="Completed, click to mark as incomplete"
								data-place="left"
								onClick={() => {
									// Uncheck both (completed and started)
									setTimeout(() => {
										document.getElementById('chk_completed').click();
									});
									document.getElementById('chk_started').click();
								}}
							>
								Completed
							</Button>
						) : (
							<Button
								color="primary"
								className="rounded-0"
								data-tip="Start task"
								data-place="left"
								onClick={() => {
									document.getElementById('chk_started').click();
								}}
							>
								Start
							</Button>
						)}
					</Col>
				</FormGroup>
			</Form>
		</div>
	);
}

EditTodoForm.propTypes = {
	editTodoObj: PropTypes.shape({
		title: PropTypes.string.isRequired,
		datetime: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
	}).isRequired,
	onChangeInput: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
};

export default EditTodoForm;
