import * as React from 'react';
import { Tabs, Icon } from 'antd';
// import LocationForm from './editFormContainer';
import { PresenterProps } from './tabViewContainer';
import DataListsView from './dataListSetContainer';
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
					<DataListsView locationKey={key} />
				</TabPane>
			))}
		</Tabs>
	);
};
