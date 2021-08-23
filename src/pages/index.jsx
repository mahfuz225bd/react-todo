import React, { Component } from 'react';

import ReactTooltip from 'react-tooltip';

import formatedDateTime from '../assets/js/formattedDateTime';
import containsInArray from '../assets/js/error.ContainsInArray';

import TodoApp from '../components/TodoApp';

// Setting up currID and data, if not found
if (!localStorage.currID && !localStorage.data) {
	localStorage.setItem('data', '[]');

	const getData = JSON.parse(localStorage.getItem('data'));
	localStorage.setItem('currID', getData[getData.length - 1] || 1);
}

const getData = () => {
	const getLocalStorageData = JSON.parse(localStorage.getItem('data'));
	const result = [];
	getLocalStorageData.forEach((each) => {
		result.push({
			selected: false,
			...each,
		});
	});
	return result;
};

const initNewTodo = {
	title: '',
	description: '',
	started: false,
};

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: getData(),
			newTodo: initNewTodo,

			searchValue: '',
			filter: 'all',
			filterDate: 'all',
			sort: 'latest',

			currView: 'list',

			openAddTodo: false,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.handleSearch = this.handleSearch.bind(this);
		this.handleFilter = this.handleFilter.bind(this);
		this.handleFilterDate = this.handleFilterDate.bind(this);
		this.handleSort = this.handleSort.bind(this);
		this.handleChangeView = this.handleChangeView.bind(this);
		this.performMultiSelection = this.performMultiSelection.bind(this);
		this.performOperation = this.performOperation.bind(this);
		this.toggleAddTodoModal = this.toggleAddTodoModal.bind(this);

		this.handleSelect = this.handleSelect.bind(this);
		this.handleStatus = this.handleStatus.bind(this);
	}

	handleChange(event) {
		switch (event.target.type) {
			case 'checkbox':
				this.setState({
					newTodo: {
						...this.state.newTodo,
						[event.target.name]: event.target.checked,
					},
				});
				break;
			default:
				this.setState({
					newTodo: {
						...this.state.newTodo,
						[event.target.name]: event.target.value,
					},
				});
		}
	}

	handleSubmit(event) {
		event.preventDefault();

		const { title, description, started } = this.state.newTodo;

		const data = JSON.parse(localStorage.getItem('data'));
		const getID = Number(localStorage.getItem('currID'));

		data.push({
			id: getID,
			title: title,
			datetime: formatedDateTime(),
			description: description,
			started: started,
			completed: false,
		});

		// Set data to localStorage
		localStorage.setItem('data', JSON.stringify(data));

		// Set data + initNewTodo to state
		this.setState({ data: getData(), newTodo: initNewTodo });

		// Increment id
		localStorage.setItem('currID', getID + 1);
	}

	handleSelect(targetId) {
		const newData = this.state.data;

		newData.forEach((each) => {
			if (each.id === targetId) {
				each.selected = !each.selected;
			}
		});

		this.setState({ data: newData });
	}

	handleStatus(targetId, to) {
		const allStutus = ['start', 'complete', 'incomplete'];

		if (containsInArray(allStutus, to)) {
			const newData = this.state.data;

			switch (to) {
				case 'start':
					newData.forEach((each) => {
						if (each.id === targetId) {
							each.started = true;
						}
					});
					break;

				case 'complete':
					newData.forEach((each) => {
						if (each.id === targetId) {
							each.completed = true;
						}
					});
					break;

				case 'incomplete':
					newData.forEach((each) => {
						if (each.id === targetId) {
							each.completed = false;
							each.started = false;
						}
					});
					break;

				default:
					break;
			}

			// Set data
			localStorage.setItem('data', JSON.stringify(newData));

			// Set state
			this.setState({ data: newData });
		}
	}

	handleSearch(event) {
		this.setState({
			searchValue: event.target.value,
		});
	}

	handleFilter(value) {
		const filterValues = ['all', 'pending', 'running', 'completed'];

		if (containsInArray(filterValues, value)) {
			this.setState({
				filter: value,
			});
		}
	}

	handleFilterDate(value) {
		const filterDateValues = [
			'all',
			'today',
			'last7Days',
			'last15Days',
			'thisMonth',
		];

		if (containsInArray(filterDateValues, value)) {
			this.setState({
				filterDate: value,
			});
		}
	}

	handleSort(value) {
		const sortValues = ['latest', 'oldest'];

		if (containsInArray(sortValues, value)) {
			this.setState({
				sort: value,
			});
		}
	}

	handleChangeView(value) {
		const views = ['list', 'table'];

		if (containsInArray(views, value)) {
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

	performSearch(searchValue) {
		const targetValue = searchValue.toLowerCase();
		return this.state.data.filter((each) =>
			each.title.toLowerCase().includes(targetValue)
		);
	}

	performFilter(data) {
		// ['all', 'pending', 'running', 'completed'];

		switch (this.state.filter) {
			case 'pending':
				return data.filter(
					(each) => each.started === false && each.completed === false
				);
			case 'running':
				return data.filter(
					(each) => each.started === true && each.completed === false
				);
			case 'completed':
				return data.filter(
					(each) => each.started === true && each.completed === true
				);
			default:
				return data;
		}
	}

	performFilterDate(data) {
		// ['all', 'today', 'last7Days', 'last15Days', 'thisMonth']

		switch (this.state.filterDate) {
			case 'today':
				return;
			case 'last7Days':
				return;
			case 'last15Days':
				return;
			case 'thisMonth':
				return;
			default:
				return data;
		}
	}

	performSort(data) {
		// ['latest', 'oldest']

		switch (this.state.sort) {
			case 'latest':
				return data.sort((x, y) => y.id - x.id);
			case 'oldest':
				return data.sort((x, y) => x.id - y.id);
			default:
				break;
		}
	}

	performMultiSelection(data, value) {
		const selections = [
			'all',
			'notStarted',
			'running',
			'completed',
			'unselectAll',
		];

		if (containsInArray(selections, value)) {
			switch (value) {
				case 'notStarted':
					data.forEach((each) => {
						if (each.started === false) {
							each.selected = true;
						}
					});
					break;
				case 'running':
					data.forEach((each) => {
						if (each.started === true && each.completed === false) {
							each.selected = true;
						}
					});
					break;
				case 'completed':
					data.forEach((each) => {
						if (each.started === true && each.completed === true) {
							each.selected = true;
						}
					});
					break;
				case 'unselectAll':
					data.map((each) => (each.selected = false));
					break;
				default:
					data.map((each) => (each.selected = true));
					break;
			}
		}
		this.setState({ data });
	}

	performOperation() {}

	render() {
		const {
			newTodo,
			searchValue,
			filter,
			filterDate,
			sort,
			currView,
			openAddTodo,
		} = this.state;

		let newData = this.performSearch(searchValue);
		newData = this.performFilter(newData);
		// performFilterDate
		newData = this.performSort(newData);

		return (
			<div>
				{/* Add Todo */}
				<TodoApp
					data={newData}
					newTodo={{
						newTodoObj: newTodo,
						onChangeInput: this.handleChange,
						onSubmit: this.handleSubmit,
					}}
					controllers={{
						search: {
							value: searchValue,
							onChangeSearchValue: this.handleSearch,
						},
						filter: {
							value: filter,
							changeFilter: this.handleFilter,
						},
						filterDate: {
							value: filterDate,
							changeFilterDate: this.handleFilterDate,
						},
						sort: {
							value: sort,
							toggleSort: this.handleSort,
						},
						dataView: {
							currView: currView,
							changeView: this.handleChangeView,
						},
						selection: {
							data: newData,
							filterValue: filter,
							performMultiSelection: this.performMultiSelection,
							performOperation: this.performOperation,
						},
						exportFiles: {
							data: newData,
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
			</div>
		);
	}
}

export default Home;
