// import mixpanel from './mixpanel';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// Dev only
import logger from 'redux-logger';
import { StateType } from 'typesafe-actions';

import rootReducer from './reducers';



// const createStoreWithMiddleware = applyMiddleware(thunk, mixpanel)(createStore);

type RootState = StateType<typeof rootReducer>;


export default function configureStore(initialState?: RootState) {
	const store = createStore(
		rootReducer,
		initialState!,
		applyMiddleware(thunk, logger),
	);
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
}
