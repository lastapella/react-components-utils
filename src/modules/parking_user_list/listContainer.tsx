import * as React from 'react';
import ListPresenter from './listPresenter';
import { ListContainerProps } from './container';
import { IDriverState } from '../../store/models';

class ListUserContainer extends React.Component<ListContainerProps, any> {
	public constructor(props: ListContainerProps) {
		super(props);
		this.state = {
			isLoaded: false
		};
	}
	public componentDidMount() {
		this.fetchAllDrivers();
	}
	public fetchAllDrivers = () => {
		this.props.fetchAllDriver().then(() => {
			this.props.syncVehicles().then(() => {
				this.setState(() => ({ isLoaded: true }));
			});
		});
	};
	public deleteRecord = (userKey: string) => {
		this.props.deleteDriver(userKey);
	};

	public normalizeDataSource = (driversState: IDriverState) => {
		const keys = Object.keys(driversState);
		return keys.map(key => ({ key, ...driversState[key] }));
	};
	public render() {
		const { isLoaded } = this.state;
		return (
			<ListPresenter
				dataSource={this.normalizeDataSource(this.props.drivers)}
				loading={!isLoaded}
				onDeleteRecord={this.deleteRecord}
			/>
		);
	}
}

export default ListUserContainer;
