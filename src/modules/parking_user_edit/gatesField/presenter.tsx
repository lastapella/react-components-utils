import * as React from 'react';
import { Table, Divider, Popconfirm, Switch } from 'antd';

export default ({
	gates,
	gatesValues,
	loading,
	onChangeSwitch
}: {
	gates: any;
	gatesValues: any;
	loading: boolean;
	onChangeSwitch: (key: string) => (checked: boolean) => void;
}) => {
	const columns = [
		{
			title: 'Gate name',
			dataIndex: 'name',
			key: 'name'
		},
		{
			title: 'Location',
			dataIndex: 'location',
			key: 'location'
		},
		{
			title: 'Allow',
			key: 'actions',
			render: (text: string, record: any) => {
				return (
					<Switch
						checkedChildren="YES"
						unCheckedChildren="NO"
						onChange={onChangeSwitch(record.key)}
						checked={gatesValues[record.key]}
					/>
				);
			}
		}
	];
	const dataSource = Object.keys(gates).map(key => ({
		...gates[key],
		key
	}));
	return (
		<React.Fragment>
			<Table
				dataSource={dataSource}
				columns={columns}
				loading={loading}
				// expandedRowRender={expandedRowRender}
				expandRowByClick={true}
			/>
		</React.Fragment>
	);
};
