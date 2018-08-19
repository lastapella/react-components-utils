import { Row, Spin } from 'antd';
import * as React from 'react';

export default () => (
	<Row type="flex" justify="center" align="middle" style={{ height: '100vh' }}>
		<Spin tip="Loading..." size="large" />
	</Row>
);
