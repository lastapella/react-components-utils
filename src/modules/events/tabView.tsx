import * as React from 'react';
import { Tabs, Divider, Button, Icon } from 'antd';
// import LocationForm from './editFormContainer';
import { PresenterProps } from './tabViewContainer';
import EventListsView from './eventsContainer';
const TabPane = Tabs.TabPane;

export default ({ locations, ...props }: PresenterProps) => {
	return (
		<Tabs>
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
				<EventListsView locationKey={key} />
					{/* <Divider orientation="left">Location Details</Divider>
					<LocationForm location={locations[key]} locationKey={key} />
					<Divider orientation="left">HardWare Connected</Divider>
					<GateListView locationKey={key} /> */}
				</TabPane>
			))}
		</Tabs>
	);
};
