// import mixpanel from './mixpanel';
import { createStore, applyMiddleware, compose, StoreEnhancer } from 'redux';
import thunk from 'redux-thunk';
// Dev only
import logger from 'redux-logger';
import { IDriverState, IRequestState, IAdministratorState } from './models';
import rootReducer from './reducers';

// const createStoreWithMiddleware = applyMiddleware(thunk, mixpanel)(createStore);
export interface RootState {
	drivers: IDriverState;
	request: IRequestState;
	administrators: IAdministratorState;
}

let enhancers: StoreEnhancer<
	{
		dispatch: {};
	},
	{}
>;
if (process.env.NODE_ENV !== 'production') {
	enhancers = applyMiddleware(thunk, logger);
} else {
	enhancers = applyMiddleware(thunk);
}
export const configureStore = (initialState?: RootState) => {
	const store = createStore(rootReducer, initialState!, enhancers);
	// const store = createStoreWithMiddleware(
	//   rootReducer,
	//   initialState,
	//   window.devToolsExtension && window.devToolsExtension()
	// );

	// if (process.env.NODE_ENV !== 'production' && module.hot) {
	//   module.hot.accept('../reducers', () => {
	//      // eslint-disable-next-line
	//     const nextReducer = require('../reducers').default;
	//     store.replaceReducer(nextReducer);
	//   });
	// }
	return store;
};
