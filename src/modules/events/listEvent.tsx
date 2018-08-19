import * as React from 'react';
import { Table, Divider, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';

const DELETE_TEXT = 'Are you sure you want to delete this user?';

export default ({
	gate,
	dataSource,
	loading,
	onDeleteRecord
}: {
	gate: any;
	dataSource: any;
	loading: boolean;
	onDeleteRecord?: any;
}) => {
	const columns = [
		{
			title: 'Type',
			dataIndex: 'type',
			key: 'type'
		},
		{
			title: 'Action',
			dataIndex: 'action',
			key: 'action'
		},
		{
			title: 'Date',
			dataIndex: 'datetime',
			key: 'datetime'
		}
	];
	return (
		<React.Fragment>
			<Table
				// tslint:disable-next-line:jsx-no-lambda
				title={() => <Divider orientation="left">{gate.name}</Divider>}
				dataSource={dataSource}
				columns={columns}
				loading={loading}
				scroll={{ x: window.window.innerWidth < 700 ? 700 : false }}
			/>
		</React.Fragment>
	);
};
