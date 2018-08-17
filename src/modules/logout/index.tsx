import * as React from 'react';
// import { Redirect } from 'react-router';
import { Spin } from 'antd';
// import withFirebaseAuth, {
// 	InjectedProps
// } from '../../firebase/withFirebaseAuth';
import { firebaseUIConfig, firebaseApp } from '../../lib/firebase/firebase';
import { RouteComponentProps } from 'react-router';

// import {Redirect } from 'react-router-dom';

class LogoutComponent extends React.Component<RouteComponentProps<any>, any> {
	public constructor(props: RouteComponentProps<any>) {
		super(props);
		this.state = {
			signedOut: false
		};
	}
	public async componentDidMount() {
		firebaseApp.auth().signOut().then(()=> window.location.replace('/'));
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
export default LogoutComponent;
