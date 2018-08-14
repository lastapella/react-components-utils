import { ActionType } from 'typesafe-actions';
import * as driverActions from '../../actions/driver';
import { Reducer } from 'redux';
import {
	MERGE_DRIVERS,
	REMOVE_DRIVER_FROM_LIST
} from '../../constants/actionTypes';
import { IDriverState } from '../../models';
import { removeWithKey, getConcatList } from '../../utils/reducers';

const initialState: IDriverState = {};

type DriverAction = ActionType<typeof driverActions>;

const reducer: Reducer<IDriverState, DriverAction> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case MERGE_DRIVERS:
			return mergeDrivers(state, action.payload);
		case REMOVE_DRIVER_FROM_LIST:
			return removeDriverFromList(state, action.payload);
	}
	return state;
};

const mergeDrivers: (
	state: IDriverState,
	payload: { list: IDriverState }
) => IDriverState = (state, payload) => {
	const { list } = payload;
	return getConcatList(state, list);
};
const removeDriverFromList: (
	state: IDriverState,
	payload: { key: string }
) => IDriverState = (state, payload) => {
	const { key } = payload;
	return removeWithKey(state, key);
};



export default reducer;
