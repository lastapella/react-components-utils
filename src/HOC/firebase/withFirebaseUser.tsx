import * as React from 'react';
import { FirebaseContext } from './firebaseContext';
import getComponentDisplayName from './../utils';

// interface PassedProps extends React.Props<any> {
// 	firebaseUser: firebase.User | Promise<firebase.User>;
// 	firebaseCurrentUser? : firebase.User | null
// }

const getFirebaseUser = async (firebaseAuth: firebase.auth.Auth) => {
	const p : Promise<firebase.User> =  new Promise((resolve) => {
		firebaseAuth.onAuthStateChanged((u: firebase.User) => {
			console.log("onAUthStatechanged :: ", u);
			resolve(u);
		})
	});
	return p.then(u=>u);
};

export default (
	ComposedComponent: React.ComponentType<any> 
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
							user={getFirebaseUser(firebaseInst.auth())} // Observer
							currentUser={firebaseInst.auth().currentUser} // Variable
						/>
					)}
				</FirebaseContext.Consumer>
			);
		}
	}
	return WithFirebaseUser;
};
