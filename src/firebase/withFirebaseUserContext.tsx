import * as React from 'react';
import { firebaseApp  } from '../lib/firebase/firebase';
import { AuthUserContext, LoadedUserContext } from './authUserContext';
import getComponentDisplayName from './utils';
// import Loader from '../../shared/ui/defaultLoader';
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
	class WithFirebaseUserContext extends React.Component<any, any> {
		public static displayName = `WithFirebaseUserContext(${getComponentDisplayName(
			ComposedComponent
		)})`;
		private unsubscribe: firebase.Unsubscribe;
		public constructor(props: any) {
			super(props);
			this.state = {
				authUser: firebaseApp.auth().currentUser,
				loading: true
			};
		}
		public componentDidMount() {
			this.unsubscribe = firebaseApp.auth().onAuthStateChanged(authUser => {
				authUser
					? this.setState(() => ({ authUser, loading: false }))
					: this.setState(() => ({ authUser: null, loading: false }));
			});
		}

		public componentWillUnmount() {
			// unsubscribe the onAuthChnaged observer
			this.unsubscribe();
		}

		public render() {
			return (
				<LoadedUserContext.Provider value={this.state.loading}>
					<AuthUserContext.Provider value={this.state.authUser}>
						{/* <React.Fragment>
							{loading ? (
								<Loader />
							) : ( */}
						<ComposedComponent {...this.props} />
						{/* )}
						</React.Fragment> */}
					</AuthUserContext.Provider>
				</LoadedUserContext.Provider>
			);
		}
	}
	return WithFirebaseUserContext;
};
