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
		this.fetchUser();
	}
	public fetchUser = () => {
		const { databaseAction: actions } = this.props;
		actions
			.getAllUsers()
			.then(snapshot => {
				this.setState(() => ({ parkingUsers: snapshot, isLoaded: true }));
			})
			.catch(err => console.log('TODO HANDLE ERR', err));
	};
	public deleteRecord = (userKey: string) => {
		const { databaseAction: actions } = this.props;
		actions
			.deleteUser(userKey)
			.then(() => this.fetchUser())
			.catch(err => console.log('TODO HANDLE ERR', err));
	};
	public render() {
		const { parkingUsers, isLoaded } = this.state;
		return (
			<ListPresenter
				dataSource={parkingUsers}
				loading={!isLoaded}
				onDeleteRecord={this.deleteRecord}
			/>
		);
	}
}

export default ListUserContainer;
