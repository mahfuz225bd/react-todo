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
					datetime: formatedDateTime(),
					started: false,
					completed: false,
				},
				{
					selected: false,
					id: 2,
					title: 'Another todo',
					description: 'someting about bla bla bal....',
					datetime: formatedDateTime(),
					started: true,
					completed: false,
				},
				{
					selected: false,
					id: 3,
					title: 'Third one',
					description: 'About todo',
					datetime: formatedDateTime(),
					started: true,
					completed: true,
				},
			],

			newTodo: initNewTodo,

			openAddTodo: false,

			switchView: 'table',
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleCheckbox = this.handleCheckbox.bind(this);

		this.handleSelect = this.handleSelect.bind(this);
		this.handleStatus = this.handleStatus.bind(this);

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

	handleStatus(targetId, to) {
		const newData = [...this.state.data];

		if (to === 'start') {
			newData.find((each) => {
				if (each.id === targetId) {
					each.started = true;
				}
			});
		}

		if (to === 'complete') {
			newData.find((each) => {
				if (each.id === targetId) {
					each.completed = true;
				}
			});
		}

		if (to === 'incomplete') {
			newData.find((each) => {
				if (each.id === targetId) {
					each.completed = false;
					each.started = false;
				}
			});
		}

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
				{/* Add Todo */}
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
					onChangeStatus={this.handleStatus}
				/>
				<ReactTooltip />
			</Container>
		);
	}
}

export default Home;
