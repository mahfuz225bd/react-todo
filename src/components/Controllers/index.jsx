import React from 'react';
import PropTypes from 'prop-types';

import { Container, Row, Col } from 'reactstrap';

import SearchPanel from './SearchPanel';
import FilterStatus from './FilterStatus';
import FilterDate from './FilterDate';
import Sort from './Sort';
import ClearSearchFilterSort from './ClearSearchFilterSort';
import ChangeView from './ChangeView';
import SelectionOperation from './SelectionOperation';
import Export from './Export';
import AddTodoButton from './AddTodoButton';

function Controllers({ controllers }) {
	const {
		search,
		filterStatus,
		filterDate,
		sort,
		clearSearchFilterSort,
		dataView,
		selection,
		exportFiles,
		openAddTodo,
		disabled,
	} = controllers;
	return (
		<Container>
			<Row>
				<Col>
					<SearchPanel
						searchValue={search.value}
						onChangeSearchValue={search.onChangeSearchValue}
						disabled={disabled}
					/>
				</Col>
				<div className="clearfix mt-2"></div>
				<Col>
					<FilterStatus
						value={filterStatus.value}
						setValue={filterStatus.changeFilter}
						disabled={disabled}
					/>{' '}
					<FilterDate
						value={filterDate.value}
						setValue={filterDate.changeFilterDate}
						disabled={disabled}
					/>{' '}
					<Sort
						value={sort.value}
						toggleSort={sort.toggleSort}
						disabled={disabled}
					/>{' '}
					<ClearSearchFilterSort
						stateValues={clearSearchFilterSort.stateValues}
						action={clearSearchFilterSort.action}
						disabled={disabled}
					/>
				</Col>
				<div className="clearfix d-block d-md-none mt-1"></div>
				<Col className="text-md-center">
					<ChangeView
						currView={dataView.currView}
						changeView={dataView.changeView}
						disabled={disabled}
					/>
				</Col>
				<div className="clearfix d-block d-md-none mt-1"></div>
				<Col className="text-md-end">
					<SelectionOperation
						data={selection.data}
						filterStatusValue={selection.filterStatusValue}
						performMultiSelection={selection.performMultiSelection}
						performSelectionOperation={selection.performSelectionOperation}
					/>{' '}
					<Export data={exportFiles.data} />{' '}
					<AddTodoButton openAddTodo={openAddTodo} />
				</Col>
			</Row>
		</Container>
	);
}

Controllers.propTypes = {
	controllers: PropTypes.object.isRequired,
	disabled: PropTypes.bool.isRequired,
};

export default Controllers;
