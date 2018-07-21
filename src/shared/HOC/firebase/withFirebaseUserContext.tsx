// Provide High Order Component to consume the authUserContext and inject the authUser to the props of wrappedComponent
// Not mandatory, this context can be used without this HOC
import * as React from 'react';
import { AuthUserContext, LoadedUserContext } from './authUserContext';
import getComponentDisplayName from './../utils';
import Loader from '../../ui/defaultLoader';

export default (ComposedComponent: React.ComponentType<any>) => {
	class WithFirebaseUserContext extends React.Component<any, any> {
		public static displayName = `WithFirebaseUserContext(${getComponentDisplayName(
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
	return WithFirebaseUserContext;
};
