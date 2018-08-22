// import mixpanel from './mixpanel';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// Dev only
import logger from 'redux-logger';
import {
	IDriverState,
	IRequestState,
	IAdministratorState,
	IVehicleState,
	IGateState,
	ILocationState,
	IUserState,
	IEventState,
	IHardwareData
} from './models';
import rootReducer from './reducers';

export interface RootState {
	drivers: IDriverState;
	request: IRequestState;
	administrators: IAdministratorState;
	vehicles: IVehicleState;
	gates: IGateState;
	locations: ILocationState;
	user: IUserState;
	events: IEventState;
	hardwareData: IHardwareData;
}

let enhancers: any;
if (process.env.NODE_ENV !== 'production') {
	enhancers = applyMiddleware(thunk, logger);
} else {
	enhancers = applyMiddleware(thunk);
}
export const configureStore = (initialState?: RootState) => {
	const store = createStore(rootReducer, initialState!, enhancers);
	return store;
};
// const createStoreWithMiddleware = applyMiddleware(thunk, mixpanel)(createStore);
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
