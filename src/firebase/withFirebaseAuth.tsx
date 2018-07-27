import * as React from 'react';
import * as firebase from 'firebase';
import {
	firebaseUIConfig,
	firebaseApp,
	IFirebaseUIConfig
} from './firebaseUI';
import getComponentDisplayName from '../shared/HOC/utils';
// tslint:disable-next-line:no-var-requires
// const StyledFirebaseAuth = require('react-firebaseui/StyledFirebaseAuth')
// 	.default;

export interface InjectedProps extends React.Props<any> {
	firebaseAuth: firebase.auth.Auth;
	firebaseUIConfig: IFirebaseUIConfig;
}
export default (ComposedComponent: React.ComponentType<InjectedProps>) => {
	class WithFirebaseAuth extends React.Component<any, any> {
		public static displayName = `WithFirebase(${getComponentDisplayName(
			ComposedComponent
		)})`;
		public render() {
			return (
				<ComposedComponent
					{...this.props}
					firebaseAuth={firebaseApp.auth()}
					firebaseUIConfig={firebaseUIConfig}
				/>
			);
		}
	}
	return WithFirebaseAuth;
};
