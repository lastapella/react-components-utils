import * as React from 'react';
// import { Redirect } from 'react-router';
import { Spin } from 'antd';
import withFirebaseAuth, {
	InjectedProps
} from '../../firebase/withFirebaseAuth';
import { RouteComponentProps } from 'react-router';

// import {Redirect } from 'react-router-dom';

class LogoutComponent extends React.Component<
	 InjectedProps & RouteComponentProps<any>,
	any
> {
	public constructor(props: InjectedProps & RouteComponentProps<any>) {
		super(props);
		this.state = {
			signedOut: false
		};
	}
	public async componentDidMount() {
		await this.props.firebaseAuth.signOut();
		setTimeout(() => {
			// this.props.history.replace('/');
			window.location.replace('/');
		}, 1000);
	}
	public render() {
		return (
			<div
				style={{
					display: 'flex',
					height: '300px',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				{' '}
				<Spin size="large" />
			</div>
		);
	}
}
export default withFirebaseAuth(LogoutComponent);
