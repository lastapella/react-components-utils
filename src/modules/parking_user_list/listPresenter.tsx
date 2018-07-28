import * as React from 'react';
import { Table, Divider } from 'antd';
import { Link } from 'react-router-dom';

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
	// {
	// 	title: 'Car Brand',
	// 	dataIndex: 'carBrand',
	// 	key: 'carBrand'
	// },
	{
		title: 'Actions',
		key: 'actions',
		render: (text: string, record: any) => (
			<React.Fragment>
				<Link to={`/driver/edit/${record.key}`}> Edit </Link>
				<Divider type="vertical" />
				<Link to={`/driver/delete/${record.key}`}> Delete </Link>
			</React.Fragment>
		)
	}
];

const expandedRowRender = (record: any) => {
	console.log('RECORD', record);
	const columnsExpanded = [
		{ title: 'Brand', dataIndex: 'brand', key: 'brand' },
		{ title: 'Model', dataIndex: 'model', key: 'model' },
		{ title: 'Color', dataIndex: 'color', key: 'color' },
		{ title: 'IU Number', dataIndex: 'iunumber', key: 'iunumber' },
		{ title: 'Licence Plate Number', dataIndex: 'lpnumber', key: 'lpnumber' },
	];

	return (
		<Table columns={columnsExpanded} dataSource={record.vehicles} pagination={false} rowKey="iunumber" />
	);
};

export default ({
	dataSource,
	loading
}: {
	dataSource: any;
	loading: boolean;
}) => (
	<Table
		dataSource={dataSource}
		columns={columns}
		loading={loading}
		expandedRowRender={expandedRowRender}
	/>
);
