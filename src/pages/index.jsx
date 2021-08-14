import React, { Component } from 'react';
import formatedDateTime from '../assets/formatedDateTime';
import { Container } from 'reactstrap';
import TodoApp from '../components/TodoApp';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{
					selected: true,
					id: 1,
					title: 'New todo',
					description: 'About todo',
					date: formatedDateTime(),
					started: false,
					completed: false,
				},
				{
					selected: false,
					id: 2,
					title: 'Another todo',
					description: 'someting about bla bla bal....',
					date: formatedDateTime(),
					started: true,
					completed: false,
				},
				{
					selected: false,
					id: 3,
					title: 'Third one',
					description: 'About todo',
					date: formatedDateTime(),
					started: true,
					completed: true,
				},
			],
		};
		this.handleSelect = this.handleSelect.bind(this);
		this.handleStart = this.handleStart.bind(this);
		this.handleComplete = this.handleComplete.bind(this);
		this.handleIncomplete = this.handleIncomplete.bind(this);
	}
	handleSelect(targetId) {
		const newData = [...this.state.data];

		newData.find((each) => {
			if (each.id === targetId) {
				each.selected = !each.selected;
			}
		});

		this.setState({ data: newData });
	}

	handleStart(targetId) {
		const newData = [...this.state.data];

		newData.find((each) => {
			if (each.id === targetId) {
				each.started = true;
			}
		});

		this.setState({ data: newData });
	}

	handleComplete(targetId) {
		const newData = [...this.state.data];

		newData.find((each) => {
			if (each.id === targetId) {
				each.completed = true;
			}
		});

		this.setState({ data: newData });
	}

	handleIncomplete(targetId) {
		const newData = [...this.state.data];

		newData.find((each) => {
			if (each.id === targetId) {
				each.completed = false;
				each.started = false;
			}
		});

		this.setState({ data: newData });
	}

	render() {
		const { data } = this.state;
		return (
			<Container fluid>
				<TodoApp
					data={data}
					handleSelect={this.handleSelect}
					handleStart={this.handleStart}
					handleComplete={this.handleComplete}
					handleIncomplete={this.handleIncomplete}
				/>
			</Container>
		);
	}
}

export default Home;
