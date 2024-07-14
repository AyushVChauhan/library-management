/* eslint-disable react/prop-types */
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { BiSortAZ, BiSortAlt2, BiSortZA } from 'react-icons/bi';
import { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { FaSearch } from 'react-icons/fa';

const tableStyle = {
	borderCollapse: 'collapse',
	tableLayout: 'auto',
	width: '100%',
};
const headerStyle = {
	backgroundColor: '#002865',
	color: 'white',
	textAlign: 'center',
};

const cellStyle = {
	border: '1px solid #dddddd',
	textAlign: 'left',
	padding: '8px',
	width: 'fit-content',
	wordBreak: 'break-all',
};

// const datatableArray = [
// 	{ field: 'index', header: 'Sr no.' },
// 	{ field: 'name', header: 'Quiz Name' },
// 	{ field: 'duration', header: 'Quiz Duration(in Minutes)' },
// 	{ field: 'marks', header: 'Marks' },
// 	{ field: 'valid_from', header: 'Quiz Date' },
// 	{ field: 'created_by.username', header: 'Created By' },
// 	{ field: 'subject_id.name', header: 'Subject' },
// ];
// const actionArray = [
// 	{
// 		icon: <FaUserEdit className="text-blue-500" />,
// 		onClick: (e) => {
// 			console.log(e);
// 		},
// 	},
// 	{
// 		icon: <FaTrash className="text-red-600" />,
// 		onClick: (e) => {
// 			confirm2(e);
// 		},
// 	},
// ];
function Datatable({ data, array, action = [], onRowClick = () => {}, extraComponent = null }) {
	const [filters, setFilters] = useState({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});
	const [globalFilterValue, setGlobalFilterValue] = useState('');
	const onGlobalFilterChange = (e) => {
		const value = e.target.value;
		let _filters = { ...filters };

		_filters['global'].value = value;

		setGlobalFilterValue(value);
		setFilters(_filters);
	};
	const dt = useRef(null);
	const exportCSV = () => {
		dt.current.exportCSV();
	};
	const sortIcon = (props) => {
		if (props.sortOrder == 0) {
			return <BiSortAlt2 className="ms-2" />;
		}
		if (props.sortOrder == -1) {
			return <BiSortZA className="ms-2" />;
		}
		if (props.sortOrder == 1) {
			return <BiSortAZ className="ms-2" />;
		}
	};
	const convertHtmlToString = (htmlContent) => {
		// Use a DOM element to convert HTML to plain text
		const div = document.createElement('div');
		div.innerHTML = htmlContent;
		return div.textContent || div.innerText || '';
	};
	return (
		<>
			<div className="flex justify-between items-center w-full mt-5 ">
				<span className="p-input-icon-right">
					<InputText
						value={globalFilterValue}
						className="py-2  px-4 border border-black rounded-md  focus:outline-none focus:border-blue-300"
						onChange={(e) => onGlobalFilterChange(e)}
						placeholder="Search"
					/>
					<FaSearch />
				</span>

				<Button
					type="button"
					icon="pi pi-file-excel"
					severity="success"
					rounded
					onClick={exportCSV}
					data-pr-tooltip="XLS"
					className="rounded-md flex items-center space-x-1"
				>
					<span>Export</span>
				</Button>
			</div>
			<div className="w-full rounded-lg overflow-hidden mt-5">
				<DataTable
					value={data}
					showGridlines
					tableStyle={tableStyle}
					sortMode="multiple"
					paginator
					rows={15}
					rowsPerPageOptions={[15, 30, 50, 100]}
					paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
					currentPageReportTemplate="{first} to {last} of {totalRecords}"
					globalFilterFields={array.map((ele) => ele.field)}
					filters={filters}
					emptyMessage="No data found."
					scrollable
					rowHover
					ref={dt}
					removableSort
					sortIcon={sortIcon}
					onRowClick={onRowClick}
				>
					{array.map((ele, ind) => {
						if (ele.field == 'question') {
							return (
								<Column
									key={'datatable' + ind}
									headerStyle={headerStyle}
									bodyStyle={cellStyle}
									sortable
									field={ele.field}
									header={ele.header}
									body={(rowData) => convertHtmlToString(rowData.question)}
								/>
							);
						} else {
							return (
								<Column
									key={'datatable' + ind}
									headerStyle={headerStyle}
									bodyStyle={cellStyle}
									sortable
									field={ele.field}
									header={ele.header}
								/>
							);
						}
					})}
					{action.length>0 && (
						<Column
							headerStyle={headerStyle}
							bodyStyle={cellStyle}
							header="Action"
							body={(data) => {
								return (
									<>
										<ActionComponent action={action} data={data} />
									</>
								);
							}}
						/>
					)}
					{extraComponent}
				</DataTable>
			</div>
		</>
	);
}
function ActionComponent({ action, data }) {
	return (
		<div className={`flex ${action.length === 1 ? 'justify-center' : 'justify-evenly'}  items-center`}>
			{action.map((ele, ind) => {
				return (
					<div
						key={'datatableAction' + ind}
						onClick={() => {
							ele.onClick(data);
						}}
						className="w-auto me-2"
					>
						{ele.icon}
					</div>
				);
			})}
		</div>
	);
}
export default Datatable;
