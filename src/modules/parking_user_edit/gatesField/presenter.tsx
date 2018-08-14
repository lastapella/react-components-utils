import * as React from 'react';
import { Table, Divider, Popconfirm, Switch } from 'antd';
import { PresenterProps } from './container';

export default ({
	gates,
	locations,
	gatesValues,
	loading,
	onChangeSwitch
}: PresenterProps) => {
	const columns = [
		{
			title: 'Gate name',
			dataIndex: 'name',
			key: 'name'
		},
		{
			title: 'Location',
			dataIndex: 'location',
			key: 'location',
			defaultSortOrder: 'ascend' as 'ascend',
			sorter: (a: { location: string }, b: { location: string }) =>
				a.location.localeCompare(b.location)
		},
		{
			title: 'Allow',
			key: 'actions',
			width: 100,
			fixed: 'right' as 'right',
			render: (text: string, record: any) => {
				return (
					<Switch
						checkedChildren="YES"
						unCheckedChildren="NO"
						onChange={onChangeSwitch(record.locationKey, record.key)}
						checked={gatesValues[record.locationKey][record.key]}
					/>
				);
			}
		}
	];
	const dataSource = !loading
		? Object.keys(gates).reduce(
				(data, locationKey) => [
					...data,
					...Object.keys(gates[locationKey]).map(gateKey => {
						return {
							...gates[locationKey][gateKey],
							location: locations[locationKey].name,
							locationKey,
							key: gateKey
						};
					})
				],
				[]
		  )
		: [];
	return (
		<React.Fragment>
			<Table
				dataSource={dataSource}
				columns={columns}
				loading={loading}
				// expandedRowRender={expandedRowRender}
				expandRowByClick={true}
				scroll={{ x: window.window.innerWidth < 700 ? 700 : false }}
				pagination={false}
			/>
		</React.Fragment>
	);
};
