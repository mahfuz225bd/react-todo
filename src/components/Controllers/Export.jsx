import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
	ButtonDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';

function Export({ data }) {
	const [exportFileOpen, setExportFileOpen] = useState(false);
	const toggleExportFile = () => setExportFileOpen(!exportFileOpen);
	return (
		<>
			<ButtonDropdown isOpen={exportFileOpen} toggle={toggleExportFile}>
				<DropdownToggle
					color="warning"
					size="sm"
					data-tip="Export all todos"
					disabled={data.length === 0}
					caret
				>
					<i className="fa fa-file-export" aria-hidden="true"></i> Export
				</DropdownToggle>
				<DropdownMenu>
					<DropdownItem onClick={() => undefined}>
						<i className="fas fa-file-excel" aria-hidden="true"></i> Export as
						Excel
					</DropdownItem>
					<DropdownItem onClick={() => undefined}>
						<i className="fas fa-file-csv" aria-hidden="true"></i> Export as CSV
					</DropdownItem>
				</DropdownMenu>
			</ButtonDropdown>
		</>
	);
}

Export.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Export;
