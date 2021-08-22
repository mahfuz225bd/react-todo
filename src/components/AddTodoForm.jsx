import React from 'react';
import PropTypes from 'prop-types';

import { Col, Form, FormGroup, Label, Input } from 'reactstrap';

function AddTodoForm({ newTodoObj, onChangeInput, onSubmit }) {
	return (
		<div>
			<Form id="addTodo" onSubmit={onSubmit} autoComplete="off">
				<FormGroup className="mb-2" row>
					<Label for="title" sm={3}>
						Task Name{' '}
						<span style={{ color: 'red', fontWeight: 'bold' }}>*</span>
					</Label>
					<Col>
						<Input
							type="text"
							name="title"
							id="title"
							placeholder="New dummy task"
							value={newTodoObj.title}
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
							value={newTodoObj.description}
							onChange={onChangeInput}
							spellCheck={false}
						/>
					</Col>
				</FormGroup>
				<FormGroup className="mb-2" row>
					<Col>
						<Label for="started">Started</Label>
					</Col>
					<Col sm={9}>
						<Input
							type="checkbox"
							name="started"
							id="started"
							checked={newTodoObj.started}
							onChange={onChangeInput}
						/>
					</Col>
					<button type="submit" style={{ display: 'none' }}></button>
				</FormGroup>
			</Form>
		</div>
	);
}

AddTodoForm.propTypes = {
	newTodoObj: PropTypes.shape({
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		started: PropTypes.bool.isRequired,
	}).isRequired,
	onChangeInput: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
};

export default AddTodoForm;
