import * as React from 'react';
import { Table, Divider, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';

const DELETE_TEXT = 'Are you sure you want to delete this user?';

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
			title: 'Display Name',
			dataIndex: 'displayName',
			key: 'displayName'
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email'
		},
		// {
		// 	title: 'Email',
		// 	databaseIndex: 'email',
		// 	key: 'email'
		// },

		{
			title: 'Actions',
			key: 'actions',
			render: (text: string, record: any) => (
				<React.Fragment>
					<Link to={`/administrators/edit/${record.key}`}> Edit </Link>
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
				style={{ overflowX: 'auto' }}
				dataSource={dataSource}
				columns={columns}
				loading={loading}
				scroll={{ x: window.window.innerWidth < 700 ? 700 : false }}
				// expandedRowRender={expandedRowRender}
				expandRowByClick={true}
			/>
		</React.Fragment>
	);
};
