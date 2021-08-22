import React from 'react';
import { Button } from 'reactstrap';

function AddTodoButton({ openAddTodo }) {
	return (
		<>
			<Button
				color="primary"
				data-tip="Create a new todo"
				size="sm"
				onClick={() => {
					openAddTodo.toggle();
					//Focus after opening addTodoModal
					setTimeout(() => {
						document.querySelector('#addTodo #title').focus();
					}, 500);
				}}
			>
				<i className="fa fa-plus" aria-hidden="true"></i> Add
			</Button>
		</>
	);
}

export default AddTodoButton;