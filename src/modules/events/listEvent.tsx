import * as React from 'react';
import { Table, Divider,  Button, Row } from 'antd';


export default ({
	gate,
	dataSource,
	loading,
}: {
	gate: any;
	dataSource: any;
	loading: boolean;
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
			<Divider orientation="left">{gate.name}</Divider>
			<Row type="flex" justify="end">
				<Button icon="reload">Refresh with latest events</Button>
			</Row>
			<Table
				dataSource={dataSource}
				columns={columns}
				loading={loading}
				scroll={{ x: window.window.innerWidth < 700 ? 700 : false }}
			/>
		</React.Fragment>
	);
};
