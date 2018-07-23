import * as React from 'react';
import { InjectedProps as withDatabaseInjectedProps } from '../../shared/HOC/firebase';
import { RouteComponentProps } from 'react-router';
import Form from './form';

export default class FormWithUser extends React.Component<
	withDatabaseInjectedProps & RouteComponentProps<{ id: string }>,
	any
> {
	public constructor(props: any) {
		super(props);
		console.log(props);
		this.state = {
			user: undefined,
			isLoaded: false
		};
	}
	public componentDidMount() {
		console.log(this.props);
		if (this.props.match.params.id) {
			this.props.databaseAction
				.readUser(this.props.match.params.id)
				.then(user => {
					this.setState(() => ({ user, isLoaded: true }));
				});
		} else {
			this.setState(() => ({ isLoaded: true }));
		}
	}
	public render() {
		const { isLoaded, user } = this.state;
		return (
			<React.Fragment>
				{' '}
				{isLoaded ? (
					<Form userMatched={user} databaseAction={this.props.databaseAction} />
				) : (
					<div> Loading ... </div>
				)}
			</React.Fragment>
		);
	}
}
