import * as React from 'react';
import { Table } from 'antd';

export default ({
	dataSource,
	columns,
	loading
}: {
	dataSource: any;
	columns: any;
	loading: boolean;
}) => <Table dataSource={dataSource} columns={columns} loading={loading} />;
