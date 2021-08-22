import React, { Component } from 'react';

import { Container } from 'reactstrap';
import ReactTooltip from 'react-tooltip';

import formatedDateTime from '../assets/js/formattedDateTime';
import containsInArray from '../assets/js/Error.ContainsInArray';

import TodoApp from '../components/TodoApp';

// Setting up currID and data, if not found
if (!localStorage.currID && !localStorage.data) {
	localStorage.setItem('currID', 4);
	localStorage.setItem(
		'data',
		`[{
		"selected":false,
		"id":1,
		"title":"New todo",
		"description":"About todo",
		"datetime":"Wed, Aug 18 2021, 12:20 AM",
		"started":false,
		"completed":false
 },
 {
		"selected":false,
		"id":2,
		"title":"Another todo",
		"description":"someting about bla bla bal....",
		"datetime":"Wed, Aug 18 2021, 12:20 AM",
		"started":true,
		"completed":false
 },
 {
		"selected":false,
		"id":3,
		"title":"Third one",
		"description":"About todo",
		"datetime":"Wed, Aug 18 2021, 12:21 AM",
		"started":true,
		"completed":true
 }]`
	);
}

const initNewTodo = {
	title: '',
	description: '',
	started: false,
};

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: JSON.parse(localStorage.getItem('data')),
			newTodo: initNewTodo,

			openAddTodo: false,

			searchValue: '',

			filter: 'all',
			filterDate: 'all',
			sort: 'asc',
			currView: 'list',
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleCheckbox = this.handleCheckbox.bind(this);

		this.handleChangeView = this.handleChangeView.bind(this);
		this.toggleAddTodoModal = this.toggleAddTodoModal.bind(this);

		this.handleSelect = this.handleSelect.bind(this);
		this.handleStatus = this.handleStatus.bind(this);

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

		// Set data
		localStorage.setItem('data', JSON.stringify(newData));

		// Set state
		this.setState({ data: newData });
	}

	handleFilter(value) {}

	handleChangeView(value) {
		const views = ['list', 'table'];
		const isValid = containsInArray(views, value);
		
		if (isValid) {
			this.setState({
				currView: value,
			});
		}
	}

	toggleAddTodoModal() {
		this.setState({
			openAddTodo: !this.state.openAddTodo,
			newTodo: initNewTodo,
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		const { title, description, started } = this.state.newTodo;

		const data = JSON.parse(localStorage.getItem('data'));
		const getID = Number(localStorage.getItem('currID'));

		data.push({
			selected: false,
			id: getID,
			title: title,
			datetime: formatedDateTime(),
			description: description,
			started: started,
			completed: false,
		});

		// Set data
		localStorage.setItem('data', JSON.stringify(data));

		// Set state
		this.setState({ data, newTodo: initNewTodo });

		// Increment id
		localStorage.setItem('currID', getID + 1);
	}

	render() {
		const { data, newTodo, currView, openAddTodo } = this.state;
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
					controllers={{
						dataView: {
							currView: currView,
							changeView: this.handleChangeView,
						},
						openAddTodo: {
							isOpen: openAddTodo,
							toggle: this.toggleAddTodoModal,
						},
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
