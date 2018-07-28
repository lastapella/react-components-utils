import * as React from 'react';
import { InjectedProps as withDatabaseInjectedProps } from '../../firebase/withFirebaseDatabase';
import ListPresenter from './listPresenter';

class ListUserContainer extends React.Component<
	withDatabaseInjectedProps,
	any
> {
	public constructor(props: withDatabaseInjectedProps) {
		super(props);
		this.state = {
			parkingUsers: [],
			isLoaded: false
		};
	}
	public componentDidMount() {
		const { databaseAction: actions } = this.props;
		actions.getAllUsers().then(snapshot => {
			// Promise.all(
			// 	snapshot.map(user => {
			// 		return new Promise((resolve, reject) => {
			// 			return actions
			// 				.getVehicleByUser(user.key)
			// 				.then(vehicles => {
			// 					console.log('VEHICLES IN LIST CONTAINER ', vehicles);
			// 					resolve(vehicles);
			// 				})
			// 				.catch(err => reject(err));
			// 		});
			// 	})
			// ).then(vehicleValues => {
			// 	vehicleValues.map((value, index) => {
			// 		snapshot[index].vehicles = value;
			// 	})
			// 	// console.log('VALUES', values);
			// 	console.log('SNAPSHOT FEJHFEK', snapshot);
			// });
			console.log(snapshot);
			this.setState(() => ({ parkingUsers: snapshot, isLoaded: true }));
		});
	}
	public render() {
		const { parkingUsers, isLoaded } = this.state;
		return (
			// <React.Fragment>
			// 	{' '}
			// 	{isLoaded ? (
			<ListPresenter dataSource={parkingUsers} loading={!isLoaded} />
			// 	) : (
			// 		<div> Loading ... </div>
			// 	)}
			// </React.Fragment>
		);
	}
}

export default ListUserContainer;
