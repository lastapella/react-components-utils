import * as React from 'react';
import { Tabs, Divider, Button, Icon } from 'antd';
import LocationForm from './editFormContainer';
import { PresenterProps } from './tabViewContainer';
import GateListView from '../gate';
const TabPane = Tabs.TabPane;

export default ({ locations, handleShowModal, ...props }: PresenterProps) => {
	const actions = (
		<Button
			type="primary"
			icon="plus-circle-o"
			// tslint:disable-next-line:jsx-no-lambda
			onClick={() => handleShowModal()}
		>
			Add Location
		</Button>
	);
	return (
		<Tabs tabBarExtraContent={actions}>
			{Object.keys(locations).map((key, index) => (
				<TabPane
					tab={
						<span>
							<Icon type="environment" />
							{locations[key].name}
						</span>
					}
					key={index}
				>
					<Divider orientation="left">Location Details</Divider>
					<LocationForm location={locations[key]} locationKey={key} />
					<Divider orientation="left">HardWare Connected</Divider>
					<GateListView locationKey={key} />
				</TabPane>
			))}
		</Tabs>
	);
};
