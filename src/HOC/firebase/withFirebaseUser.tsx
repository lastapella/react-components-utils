import * as React from 'react';
import { FirebaseContext } from './firebaseContext';
import getComponentDisplayName from './../utils';

interface PassedProps extends React.Props<any> {
	firebaseUser: firebase.User | Promise<firebase.User>;
	firebaseCurrentUser? : firebase.User | null
}

const getFirebaseUser = async (firebaseAuth: firebase.auth.Auth) => {
	const p : Promise<firebase.User> =  new Promise((resolve) => {
		firebaseAuth.onAuthStateChanged((u: firebase.User) => resolve(u));
	});
	return p;
};

export default (
	ComposedComponent: React.ComponentClass<PassedProps> | React.SFC<PassedProps>
) => {
	class WithFirebaseUser extends React.Component<any, any> {
		public static displayName = `WithFirebaseUser(${getComponentDisplayName(
			ComposedComponent
		)})`;
		public render() {
			return (
				<FirebaseContext.Consumer>
					{firebaseInst => (
						<ComposedComponent
							{...this.props}
							firebaseUser={getFirebaseUser(firebaseInst.auth())}
							firebaseCurrentUser={firebaseInst.auth().currentUser}
						/>
					)}
				</FirebaseContext.Consumer>
			);
		}
	}
	return WithFirebaseUser;
};
