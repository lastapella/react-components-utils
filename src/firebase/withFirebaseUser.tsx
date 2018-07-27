// Provide High Order Component to consume the authUserContext and inject the authUser to the props of wrappedComponent
// Not mandatory, this context can be used without this HOC
import * as React from 'react';
import { AuthUserContext, LoadedUserContext } from './authUserContext';
import getComponentDisplayName from './utils';
import  LoaderDefault from '../shared/ui/defaultLoader';

const t = (Loader : React.ComponentType = LoaderDefault ) => (ComposedComponent: React.ComponentType<any>) => {
	class WithFirebaseUser extends React.Component<any, any> {
		public static displayName = `WithFirebaseUser(${getComponentDisplayName(
			ComposedComponent
		)})`;

		public render() {
			return (
				<LoadedUserContext.Consumer>
					{loading =>
						loading ? (
							<Loader />
						) : (
							<AuthUserContext.Consumer>
								{authUser => <ComposedComponent authUser={authUser} {...this.props} />}
							</AuthUserContext.Consumer>
						)
					}
				</LoadedUserContext.Consumer>
			);
		}
	}
	return WithFirebaseUser;
};

export default t;