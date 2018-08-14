import * as React from 'react';
import { Table, Divider, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import ExpandedRowRender from './expandedRowRenderContainer';
import { IDriver } from '../../store/models';
const DELETE_TEXT = 'Are you sure you want to delete this user?';

const expandedRowRender = (record: any) => {
	const columnsExpanded = [
		{ title: 'Brand', dataIndex: 'brand', key: 'brand' },
		{ title: 'Model', dataIndex: 'model', key: 'model' },
		{ title: 'Color', dataIndex: 'color', key: 'color' },
		{ title: 'IU Number', dataIndex: 'iunumber', key: 'iunumber' },
		{ title: 'Licence Plate Number', dataIndex: 'lpnumber', key: 'lpnumber' }
	];

	return (
		<Table
			columns={columnsExpanded}
			dataSource={record.vehicles}
			pagination={false}
			rowKey="iunumber"
		/>
	);
};

export default ({
	dataSource,
	loading,
	onDeleteRecord
}: {
	dataSource: any;
	loading: boolean;
	onDeleteRecord?: any;
}) => {
	const columns = [
		{
			title: 'Firstname',
			dataIndex: 'firstname',
			key: 'firstname'
		},
		{
			title: 'Lastname',
			dataIndex: 'lastname',
			key: 'lastname'
		},
		{
			title: 'Email',
			databaseIndex: 'email',
			key: 'email'
		},

		{
			title: 'Actions',
			key: 'actions',
			render: (text: string, record: any) => (
				<React.Fragment>
					<Link to={`/drivers/edit/${record.key}`}> Edit </Link>
					<Divider type="vertical" />
					<Popconfirm
						key="action-delete"
						placement="topLeft"
						title={DELETE_TEXT}
						// tslint:disable-next-line:jsx-no-lambda
						onConfirm={e => onDeleteRecord(record.key)}
						okText="Yes"
						cancelText="No"
					>
						<Link to="#"> Delete </Link>
					</Popconfirm>
				</React.Fragment>
			)
		}
	];
	return (
		<React.Fragment>
			<Table
				dataSource={dataSource}
				columns={columns}
				loading={loading}
				scroll={{ x: window.window.innerWidth < 800 ? 800 : false }}
				// tslint:disable-next-line:jsx-no-lambda
				expandedRowRender={(record: IDriver) => (
					<ExpandedRowRender vehicles={record.vehicles} />
				)}
				expandRowByClick={true}
			/>
		</React.Fragment>
	);
};
