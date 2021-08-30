import React, { Component } from 'react';

import ReactTooltip from 'react-tooltip';

import getData from '../assets/js/getLocalStorageData';
import containsInArray from '../assets/js/error.ContainsInArray';
import formattedDateTime from '../assets/js/formattedDateTime';
import getDateTimeValue from '../assets/js/getDateStringForHTMLInput';

import TodoApp from '../components/TodoApp';

const initNewTodo = {
	title: '',
	description: '',
	started: false,
};

const initEditTodo = {
	title: '',
	datetime: getDateTimeValue(new Date()),
	description: '',
	started: false,
	completed: false,
};

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: getData(),
			newTodo: initNewTodo,
			viewTodo: {},
			editTodo: initEditTodo,
			deleteTodo: {},

			searchValue: '',
			filterStatus: 'all',
			filterDate: 'all',
			sort: 'latest',

			currView: 'list',

			openAddTodoModal: false,
			openViewTodoModal: false,
			openEditTodoModal: false,
			openDeleteTodoModal: false,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.handleSelect = this.handleSelect.bind(this);
		this.handleStatus = this.handleStatus.bind(this);
		this.setViewTodo = this.setViewTodo.bind(this);
		this.setEditTodo = this.setEditTodo.bind(this);
		this.updateTodo = this.updateTodo.bind(this);
		this.setDeleteTodo = this.setDeleteTodo.bind(this);
		this.deleteTodo = this.deleteTodo.bind(this);

		this.handleSearch = this.handleSearch.bind(this);
		this.handleFilterStatus = this.handleFilterStatus.bind(this);
		this.handleFilterDate = this.handleFilterDate.bind(this);
		this.handleSort = this.handleSort.bind(this);
		this.resetSearchFilterSort = this.resetSearchFilterSort.bind(this);
		this.handleChangeView = this.handleChangeView.bind(this);
		this.performMultiSelection = this.performMultiSelection.bind(this);
		this.performSelectionOperation = this.performSelectionOperation.bind(this);

		this.toggleModal = this.toggleModal.bind(this);
	}

	handleChange(event) {
		switch (event.target.type) {
			case 'checkbox':
				this.setState({
					newTodo: {
						...this.state.newTodo,
						[event.target.name]: event.target.checked,
					},
					editTodo: {
						...this.state.editTodo,
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
					editTodo: {
						...this.state.editTodo,
						[event.target.name]: event.target.value,
					},
				});
		}
	}

	handleSubmit(event) {
		event.preventDefault();

		const { title, description, started } = this.state.newTodo;

		const myLocalStorageData = JSON.parse(localStorage.getItem('data'));
		const getID = Number(localStorage.getItem('currID'));

		myLocalStorageData.push({
			id: getID,
			title: title,
			datetime: formattedDateTime(),
			description: description,
			started: started,
			completed: false,
		});

		// Set data to localStorage
		localStorage.setItem('data', JSON.stringify(myLocalStorageData));

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
		const allStatus = ['start', 'complete', 'incomplete'];

		if (containsInArray(allStatus, to)) {
			const newData = JSON.parse(localStorage.getItem('data'));

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

			// Set data to localStorage
			localStorage.setItem('data', JSON.stringify(newData));

			// Set data at state
			this.setState({ data: getData() });
		}
	}

	setViewTodo(targetId) {
		const filteredById = JSON.parse(localStorage.getItem('data')).filter(
			(each) => each.id === targetId
		)[0];

		const taskStatus =
			filteredById.started && !filteredById.completed
				? 'Running'
				: filteredById.started && filteredById.completed
				? 'Completed'
				: 'Not started';

		this.setState({
			viewTodo: {
				id: filteredById.id,
				title: filteredById.title,
				datetime: filteredById.datetime,
				description: filteredById.description,
				status: taskStatus,
			},
		});
	}

	setEditTodo(targetId) {
		const filteredById = JSON.parse(localStorage.getItem('data')).filter(
			(each) => each.id === targetId
		)[0];

		this.setState({
			editTodo: {
				id: filteredById.id,
				title: filteredById.title,
				datetime: filteredById.datetime,
				description: filteredById.description,
				started: filteredById.started,
				completed: filteredById.completed,
			},
		});
	}

	updateTodo(event) {
		event.preventDefault();

		const { editTodo } = this.state;
		const myLocalStorageData = JSON.parse(localStorage.getItem('data'));

		myLocalStorageData.forEach((each) => {
			if (editTodo.id === each.id) {
				each.title = editTodo.title;
				each.datetime = editTodo.datetime;
				each.description = editTodo.description;
				each.started = editTodo.started;
				each.completed = editTodo.completed;
			}
		});

		// Set data to localStorage
		localStorage.setItem('data', JSON.stringify(myLocalStorageData));

		// Set data + initEditTodo to state
		this.setState({ data: getData(), editTodo: initEditTodo });
	}

	setDeleteTodo(targetId) {
		const filteredById = JSON.parse(localStorage.getItem('data')).filter(
			(each) => each.id === targetId
		)[0];

		this.setState({
			deleteTodo: {
				id: filteredById.id,
				title: filteredById.title,
			},
		});
	}

	deleteTodo(event) {
		event.preventDefault();

		const { deleteTodo } = this.state;
		const myLocalStorageData = JSON.parse(localStorage.getItem('data'));

		// Set data to localStorage
		localStorage.setItem(
			'data',
			JSON.stringify(
				myLocalStorageData.filter((each) => each.id !== deleteTodo.id)
			)
		);

		// Set data + initEditTodo to state
		this.setState({ data: getData(), deleteTodo: {} });
	}

	handleSearch(event) {
		this.setState({
			searchValue: event.target.value,
		});
	}

	handleFilterStatus(value) {
		const filterValues = ['all', 'pending', 'running', 'completed'];

		if (containsInArray(filterValues, value)) {
			this.setState({
				filterStatus: value,
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

	resetSearchFilterSort() {
		this.setState({
			searchValue: '',
			filterStatus: 'all',
			filterDate: 'all',
			sort: 'latest',
		});
	}

	handleChangeView(value) {
		const views = ['list', 'table'];

		if (containsInArray(views, value)) {
			this.setState({
				currView: value,
			});
		}
	}

	toggleModal(targetModal) {
		const {
			openAddTodoModal,
			openViewTodoModal,
			openEditTodoModal,
			openDeleteTodoModal,
		} = this.state;
		const modals = ['addTodo', 'viewTodo', 'editTodo', 'deleteTodo'];
		if (containsInArray(modals, targetModal)) {
			switch (targetModal) {
				case 'addTodo':
					this.setState({
						openAddTodoModal: !openAddTodoModal,
						newTodo: initNewTodo,
					});
					break;

				case 'viewTodo':
					this.setState({
						openViewTodoModal: !openViewTodoModal,
					});

					// By closing, init viewTodo
					if (openViewTodoModal) {
						this.setState({
							viewTodo: {},
						});
					}
					break;
				case 'editTodo':
					this.setState({
						openEditTodoModal: !openEditTodoModal,
					});

					// By closing, init editTodo
					if (openEditTodoModal) {
						this.setState({
							editTodo: initEditTodo,
						});
					}
					break;
				case 'deleteTodo':
					this.setState({
						openDeleteTodoModal: !openDeleteTodoModal,
					});

					// By closing, init deleteTodo
					if (openDeleteTodoModal) {
						this.setState({
							deleteTodo: {},
						});
					}
					break;
				default:
					break;
			}
		}
	}

	performSearch(searchValue) {
		const targetValue = searchValue.toLowerCase();
		return this.state.data.filter((each) =>
			each.title.toLowerCase().includes(targetValue)
		);
	}

	performFilterStatus(data) {
		// ['all', 'pending', 'running', 'completed'];

		switch (this.state.filterStatus) {
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

		// Refresh data at state
		this.setState({ data: this.state.data });
	}

	performSelectionOperation(data, value) {
		const operations = [
			'startAll',
			'completeAll',
			'incompleteAll',
			'deleteAll',
		];

		const myLocalStorageData = JSON.parse(localStorage.getItem('data'));

		if (containsInArray(operations, value)) {
			switch (value) {
				case 'startAll':
					data.forEach((eachData) => {
						if (eachData.selected) {
							myLocalStorageData.forEach((eachLocalStorageData) => {
								if (
									eachData.id === eachLocalStorageData.id &&
									!eachLocalStorageData.started
								) {
									eachLocalStorageData.started = true;
								}
							});
						}
					});
					break;
				case 'completeAll':
					data.forEach((eachData) => {
						myLocalStorageData.forEach((eachLocalStorageData) => {
							if (
								eachData.id === eachLocalStorageData.id &&
								eachLocalStorageData.started &&
								!eachLocalStorageData.completed
							) {
								eachLocalStorageData.completed = true;
							}
						});
					});
					break;
				case 'incompleteAll':
					data.forEach((eachData) => {
						myLocalStorageData.forEach((eachLocalStorageData) => {
							if (
								eachData.id === eachLocalStorageData.id &&
								eachLocalStorageData.started &&
								eachLocalStorageData.completed
							) {
								eachLocalStorageData.started = false;
								eachLocalStorageData.completed = false;
							}
						});
					});
					break;
				case 'deleteAll':
					break;
				default:
					break;
			}
		}

		// Set data to localStorage
		localStorage.setItem('data', JSON.stringify(myLocalStorageData));

		// Set data at state
		this.setState({ data: getData() });
	}

	render() {
		const {
			newTodo,
			searchValue,
			filterStatus,
			filterDate,
			sort,
			currView,
			openAddTodoModal,
			viewTodo,
			openViewTodoModal,
			editTodo,
			openEditTodoModal,
			deleteTodo,
			openDeleteTodoModal,
		} = this.state;

		let newData = this.performSearch(searchValue);
		newData = this.performFilterStatus(newData);
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
						disabled: this.state.data.length === 0,
						search: {
							value: searchValue,
							onChangeSearchValue: this.handleSearch,
						},
						filterStatus: {
							value: filterStatus,
							changeFilter: this.handleFilterStatus,
						},
						filterDate: {
							value: filterDate,
							changeFilterDate: this.handleFilterDate,
						},
						sort: {
							value: sort,
							toggleSort: this.handleSort,
						},
						clearSearchFilterSort: {
							stateValues: { searchValue, filterStatus, filterDate, sort },
							action: this.resetSearchFilterSort,
						},
						dataView: {
							currView: currView,
							changeView: this.handleChangeView,
						},
						selection: {
							data: newData,
							filterStatusValue: filterStatus,
							performMultiSelection: this.performMultiSelection,
							performSelectionOperation: this.performSelectionOperation,
						},
						exportFiles: {
							data: this.state.data,
						},
						openAddTodo: {
							isOpen: openAddTodoModal,
							toggle: () => this.toggleModal('addTodo'),
						},
					}}
					onSelect={this.handleSelect}
					onChangeStatus={this.handleStatus}
					viewTodo={{
						viewTodoObj: viewTodo,
						setViewTodo: this.setViewTodo,
						modal: {
							isOpen: openViewTodoModal,
							toggle: () => this.toggleModal('viewTodo'),
						},
					}}
					editTodo={{
						editTodoObj: editTodo,
						onChangeInput: this.handleChange,
						setEditTodo: this.setEditTodo,
						modal: {
							isOpen: openEditTodoModal,
							toggle: () => this.toggleModal('editTodo'),
						},
						update: this.updateTodo,
					}}
					deleteTodo={{
						deleteTodoObj: deleteTodo,
						setDeleteTodo: this.setDeleteTodo,
						modal: {
							isOpen: openDeleteTodoModal,
							toggle: () => this.toggleModal('deleteTodo'),
						},
						delete: this.deleteTodo,
					}}
				/>
				<ReactTooltip />
			</div>
		);
	}
}

export default Home;
