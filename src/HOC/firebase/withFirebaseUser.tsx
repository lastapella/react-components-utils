import * as React from 'react';
import { firebaseApp /* , FirebaseContext  */ } from './firebaseContext';
import getComponentDisplayName from './../utils';
import Loader from '../../shared/ui/defaultLoader';
// interface PassedProps extends React.Props<any> {
// 	firebaseUser: firebase.User | Promise<firebase.User>;
// 	firebaseCurrentUser? : firebase.User | null
//

// const getFirebaseUser = async (firebaseAuth: firebase.auth.Auth) => {
// 	const p: Promise<firebase.User> = new Promise(resolve => {
// 		firebaseAuth.onAuthStateChanged((u: firebase.User) => {
// 			console.log('onAUthStatechanged :: ', u);
// 			resolve(u);
// 		});
// 	});
// 	return p.then(u => u);
// };

export default (ComposedComponent: React.ComponentType<any>) => {
	class WithFirebaseUser extends React.Component<any, any> {
		public static displayName = `WithFirebaseUser(${getComponentDisplayName(
			ComposedComponent
		)})`;

		public constructor(props: any) {
			super(props);
			this.state = {
				authUser: firebaseApp.auth().currentUser,
				loading: true
			};
		}
		public componentDidMount() {
			firebaseApp.auth().onAuthStateChanged(authUser => {
				authUser
					? this.setState(() => ({ authUser, loading: false }))
					: this.setState(() => ({ authUser: null, loading: false }));
			});
		}

		public render() {
			const { loading } = this.state;
			return (
				<React.Fragment>
					{loading ? (
						<Loader />
					) : (
						<ComposedComponent {...this.props} user={this.state.authUser} />
					)}
				</React.Fragment>
			);
		}
	}
	return WithFirebaseUser;
};
