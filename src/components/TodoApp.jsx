import React from 'react';

import { Container, Col, Row } from 'reactstrap';
import ListView from './ListView';
import TableView from './TableView';

const TodoApp = ({
	data,
	handleSelect,
	handleStart,
	handleComplete,
	handleIncomplete,
}) => {
	return (
		<>
			<Container>
				<Row>
					<Col className="my-5">
						<h2 className="display-4 text-center">React Todo</h2>
					</Col>
				</Row>
				<Row>
					<Col>
						<ListView
							todos={data}
							onSelect={handleSelect}
							onStart={handleStart}
							onComplete={handleComplete}
							onIncomplete={handleIncomplete}
						/>
						<TableView
							todos={data}
							onSelect={handleSelect}
							onStart={handleStart}
							onComplete={handleComplete}
							onIncomplete={handleIncomplete}
						/>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default TodoApp;
