import React, { Component } from 'react';

import { Container } from 'reactstrap';
import ReactTooltip from 'react-tooltip';

import formatedDateTime from '../assets/js/formattedDateTime';

import TodoApp from '../components/TodoApp';

const initNewTodo = {
	title: '',
	description: '',
	started: true,
};

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

			newTodo: initNewTodo,

			openAddTodo: false,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleCheckbox = this.handleCheckbox.bind(this);

		this.handleSelect = this.handleSelect.bind(this);
		this.handleStart = this.handleStart.bind(this);
		this.handleComplete = this.handleComplete.bind(this);
		this.handleIncomplete = this.handleIncomplete.bind(this);

		this.toggleAddTodoModal = this.toggleAddTodoModal.bind(this);
		this.resetAddTodo = this.resetAddTodo.bind(this);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({
			newTodo: {
				...this.state.newTodo,
				[event.target.name]: event.target.value,
			},
		});
	}

	handleCheckbox(event) {
		this.setState({
			newTodo: {
				...this.state.newTodo,
				[event.target.name]: event.target.checked,
			},
		});
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

	toggleAddTodoModal() {
		this.setState({
			openAddTodo: !this.state.openAddTodo,
		});
	}

	resetAddTodo() {
		this.setState({
			newTodo: initNewTodo,
		});
	}

	handleSubmit(event) {
		const { title, description, started } = this.state.newTodo;
		const { data } = this.state;

		const lastData = data[data.length - 1];
		const lastID = lastData.id || 0;

		event.preventDefault();

		const newData = {
			selected: false,
			id: lastID + 1,
			title: title,
			date: formatedDateTime(),
			description: description,
			started: started,
			completed: false,
		};

		this.setState({
			data: [...data, newData],
		});
	}

	render() {
		const { data, newTodo, openAddTodo } = this.state;
		return (
			<Container fluid>
				<button onClick={this.toggleAddTodoModal}>Click</button>
				<TodoApp
					data={data}
					newTodo={{
						newTodoObj: newTodo,
						onChangeInput: this.handleChange,
						onChangeCheckbox: this.handleCheckbox,
						onSubmit: this.handleSubmit,
					}}
					openAddTodo={{
						isOpen: openAddTodo,
						toggle: this.toggleAddTodoModal,
						reset: this.resetAddTodo,
					}}
					onSelect={this.handleSelect}
					onStart={this.handleStart}
					onComplete={this.handleComplete}
					onIncomplete={this.handleIncomplete}
				/>
				<ReactTooltip />
			</Container>
		);
	}
}

export default Home;
