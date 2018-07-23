import * as React from 'react';
import { Link } from 'react-router-dom';
import { InjectedProps as withDatabaseInjectedProps } from '../../shared/HOC/firebase/withFirebaseDatabase';
import ListPresenter from './listPresenter';

const columns = [
	{
		title: 'Firstname',
		dataIndex: 'firstname',
		key: 'firstname',
		render: (text: string, record: any) => (
			<Link to={`/parkinguser/${record.key}`}> {text} </Link>
		)
	},
	{
		title: 'Lastname',
		dataIndex: 'lastname',
		key: 'lastname'
	},
	{
		title: 'Car Brand',
		dataIndex: 'carBrand',
		key: 'carBrand'
	}
];

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
		actions.readUsers().then(snapshot => {
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
			<ListPresenter
				dataSource={parkingUsers}
				columns={columns}
				loading={!isLoaded}
			/>
			// 	) : (
			// 		<div> Loading ... </div>
			// 	)}
			// </React.Fragment>
		);
	}
}

export default ListUserContainer;
