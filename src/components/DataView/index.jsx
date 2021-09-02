import React from 'react';
import PropTypes from 'prop-types';

import ListView from './ListView';
import TableView from './TableView';

function DataView({
	currView,
	data,
	onSelect,
	onChangeStatus,
	viewTodo,
	editTodo,
	deleteTodo,
}) {
	const footerText = () => {
		const selectedItems = data.filter((each) => each.selected);

		return selectedItems.length > 1
			? `Selected: ${selectedItems.length} record(s)`
			: selectedItems.length === 1
			? `Selected: ${selectedItems[0].title} (Record ID=${selectedItems[0].id})`
			: '';
	};

	return (
		<div>
			{(function () {
				switch (currView) {
					case 'table':
						return (
							<TableView
								todos={data}
								onSelect={onSelect}
								onChangeStatus={onChangeStatus}
								viewTodo={viewTodo}
								editTodo={editTodo}
								deleteTodo={deleteTodo}
							/>
						);

					case 'list':
						return (
							<ListView
								todos={data}
								onSelect={onSelect}
								onChangeStatus={onChangeStatus}
								viewTodo={viewTodo}
								editTodo={editTodo}
								deleteTodo={deleteTodo}
							/>
						);

					default:
						break;
				}
			})()}
			<div>{footerText()}</div>
		</div>
	);
}

DataView.propTypes = {
	currView: PropTypes.string.isRequired,
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
	onSelect: PropTypes.func.isRequired,
	onChangeStatus: PropTypes.func.isRequired,
	viewTodo: PropTypes.object.isRequired,
	editTodo: PropTypes.object.isRequired,
	deleteTodo: PropTypes.object.isRequired,
};

export default DataView;
