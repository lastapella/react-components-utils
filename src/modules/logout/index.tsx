import * as React from 'react';
// import { Redirect } from 'react-router';
import { Spin } from 'antd';
import withFirebaseAuth from '../../HOC/firebase/withFirebaseAuth';

// import {Redirect } from 'react-router-dom';

interface LogoutProps {
	firebaseAuth: firebase.auth.Auth;
}

class LogoutComponent extends React.Component<LogoutProps, any> {
	public constructor(props: LogoutProps) {
		super(props);
		this.state = {
			signedOut: false
		};
	}
	public async componentDidMount() {
		await this.props.firebaseAuth.signOut();
		setTimeout(() => {
			window.location.replace('/');
		}, 1000);
	}
	public render() {
		return <div style={{display: 'flex', height:'300px', justifyContent:'center', alignItems:'center'}}> <Spin size="large"/></div>;
	}
}
export default withFirebaseAuth(LogoutComponent);
