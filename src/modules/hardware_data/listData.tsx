import * as React from 'react';
import { Table, Divider, Button, Row, Tag } from 'antd';

export default ({
	gate,
	dataSource,
	loading
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
			title: 'Data',
			dataIndex: 'data',
			key: 'data'
		},
		{
			title: 'Driver Count',
			dataIndex: 'driverCount',
			key: 'driverCount'
		},
		{
			title: 'Sync with hardware',
			dataIndex: 'sendToHardware',
			key: 'sendToHardware',
			render: (record: any) =>
				record.sendToHardware ? (
					<Tag color="green">Yes</Tag>
				) : (
					<Tag color="red">No</Tag>
				)
		}
	];
	return (
		<React.Fragment>
			<Divider orientation="left">{gate.name}</Divider>
			<Table
				dataSource={dataSource}
				columns={columns}
				loading={loading}
				scroll={{ x: window.window.innerWidth < 700 ? 700 : false }}
			/>
		</React.Fragment>
	);
};
