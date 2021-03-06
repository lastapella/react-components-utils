import * as React from 'react';
import { Collapse, Button, Row, Col, Popconfirm } from 'antd';

import { PresenterProps } from './formListcontainer';
import { IGate } from '../../../store/models';
import FormEdit from './formEditContainer';

const Panel = Collapse.Panel;

const DELETE_TEXT = 'Are you sure you want to delete this gate?';

const PanelHeader = ({
	gate,
	gateKey,
	locationKey,
	deleteHandler
}: {
	gate: IGate;
	gateKey: string;
	locationKey: string;
	deleteHandler: (locationKey: string, gateKey: string) => void;
}) => (
	<Row
		type="flex"
		justify="space-between"
		gutter={4}
		style={{ padding: '0 10px' }}
	>
		<Col>{gate.name}</Col>
		<Col>
			<Popconfirm
				key="gate-delete"
				placement="topLeft"
				title={DELETE_TEXT}
				// tslint:disable-next-line:jsx-no-lambda
				onConfirm={e => {
					e.preventDefault();
					deleteHandler(locationKey, gateKey);
				}}
				okText="Yes"
				cancelText="No"
			>
				<Button
					icon="delete"
					type="danger"
					// tslint:disable-next-line:jsx-no-lambda
					onClick={(e: any) => e.preventDefault()}
				>
					{' '}
					DELETE
				</Button>
			</Popconfirm>
		</Col>
	</Row>
);

export default ({ gates, deleteHandler, locationKey }: PresenterProps) => (
	<Collapse bordered={true} defaultActiveKey={[]} accordion={true}>
		{Object.keys(gates).map(key => {
			const gate = gates[key];
			return (
				<Panel
					header={
						<PanelHeader
							gate={gate}
							gateKey={key}
							locationKey={locationKey}
							deleteHandler={deleteHandler}
						/>
					}
					key={`${key}`}
				>
					<FormEdit locationKey={locationKey} gateKey={key} />
				</Panel>
			);
		})}
	</Collapse>
);
