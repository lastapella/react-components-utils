import * as React from 'react';
import * as firebase from 'firebase';
import getComponentDisplayName from '../shared/HOC/utils';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
// tslint:disable-next-line:no-var-requires
// const StyledFirebaseAuth = require('react-firebaseui/StyledFirebaseAuth')
// 	.default;

const store = configureStore();
export default (ComposedComponent: React.ComponentType) => {
	class WithStore extends React.Component<any, any> {
		public static displayName = `WithStore(${getComponentDisplayName(
			ComposedComponent
		)})`;

		public render() {
			return (
				<Provider store={store}>
					<ComposedComponent />
				</Provider>
			);
		}
	}
	return WithStore;
};
