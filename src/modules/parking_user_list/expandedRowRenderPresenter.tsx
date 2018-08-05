import * as React from 'react';
import { Table } from 'antd';
import { PresenterProps } from './expandedRowRenderContainer';

export default class extends React.Component<PresenterProps> {
	public render() {
		const vehicles = this.props.vehicles || [];
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
				dataSource={vehicles}
				pagination={false}
				rowKey="iunumber"
			/>
		);
	}
}
