import * as React from 'react';
import { InjectedProps } from '../../firebase/withFirebaseAuth';
// tslint:disable-next-line:no-var-requires
const StyledFirebaseAuth = require('react-firebaseui/StyledFirebaseAuth')
	.default;

class SignInScreen extends React.Component<
	React.Props<any> & InjectedProps,
	any
> {
	render() {
		const { firebaseAuth, firebaseUIConfig } = this.props;
		return (
			<div>
				<h1>My App</h1>
				<p>Please sign-in:</p>
				<StyledFirebaseAuth
					uiConfig={firebaseUIConfig}
					firebaseAuth={firebaseAuth}
				/>
			</div>
		);
	}
}
export default SignInScreen;
