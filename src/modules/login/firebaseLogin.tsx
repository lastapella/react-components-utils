import * as React from 'react';
import withFirebaseAuth from '../../HOC/firebase/withFirebaseAuth';
import { firebaseUIConfig } from '../../HOC/firebase/firebaseContext';
// tslint:disable-next-line:no-var-requires
const StyledFirebaseAuth = require('react-firebaseui/StyledFirebaseAuth')
	.default;

interface SignInScreenProps extends React.Props<any> {
	firebaseAuth: firebase.auth.Auth;
}

class SignInScreen extends React.Component<SignInScreenProps, any> {
	render() {
		const { firebaseAuth } = this.props;
		return (
			<div>
				<h1>My App</h1>
				<p>Please sign-in:</p>
				<StyledFirebaseAuth uiConfig={firebaseUIConfig} firebaseAuth={firebaseAuth} />
			</div>
		);
	}
}
export default withFirebaseAuth(SignInScreen);
