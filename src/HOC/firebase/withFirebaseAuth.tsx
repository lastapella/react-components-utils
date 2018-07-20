import * as React from 'react';
import * as firebase from 'firebase';
import { FirebaseContext } from './firebaseContext';
import getComponentDisplayName from './../utils';
// tslint:disable-next-line:no-var-requires
// const StyledFirebaseAuth = require('react-firebaseui/StyledFirebaseAuth')
// 	.default;

interface PassedProps extends React.Props<any> {
	firebaseAuth: firebase.auth.Auth;
}
export default (
	ComposedComponent: React.ComponentType<PassedProps>
) => {
	class WithFirebaseAuth extends React.Component<any, any> {
		public static displayName = `WithFirebase(${getComponentDisplayName(
			ComposedComponent
		)})`;
		public render() {
			return (
				<FirebaseContext.Consumer>
					{firebaseInst => (
						<ComposedComponent
							{...this.props}
							firebaseAuth={firebaseInst.auth()}
						/>
					)}
				</FirebaseContext.Consumer>
			);
		}
	}
	return WithFirebaseAuth;
};
