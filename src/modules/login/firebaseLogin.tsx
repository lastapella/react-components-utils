import * as React from 'react';
// import { InjectedProps } from '../../firebase/withFirebaseAuth';
import {
	firebaseUIConfig,
	firebaseApp,
} from '../../lib/firebase/firebase';
// tslint:disable-next-line:no-var-requires
const StyledFirebaseAuth = require('react-firebaseui/StyledFirebaseAuth')
	.default;

class SignInScreen extends React.Component<
	React.Props<any>,
	any
> {
	render() {
		// const { firebaseAuth, firebaseUIConfig } = this.props;
		return (
				<StyledFirebaseAuth
					uiConfig={firebaseUIConfig}
					firebaseAuth={firebaseApp.auth()}
				/>
		);
	}
}
export default SignInScreen;
