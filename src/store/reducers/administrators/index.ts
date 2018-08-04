import { ActionType } from 'typesafe-actions';
import * as administratorActions from '../../actions/administrators';
import { Reducer } from 'redux';
import {
	MERGE_ADMINISTRATORS,
	REMOVE_ADMINISTRATOR_FROM_LIST
} from '../../constants/actionTypes';
import { IDriverState } from '../../models';

const initialState: IDriverState = {};

type DriverAction = ActionType<typeof administratorActions>;

const reducer: Reducer<IDriverState, DriverAction> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case MERGE_ADMINISTRATORS:
			return mergeDrivers(state, action.payload);
		case REMOVE_ADMINISTRATOR_FROM_LIST:
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

const removeWithKey = (list: IDriverState, key: string) => {
	const { [key]: _, ...nextState } = list;
	return nextState;
	// return [...list.slice(0, index), ...list.slice(index + 1)];
};
const getConcatList = (currentList: IDriverState, concatList: IDriverState) => {
	return { ...currentList, ...concatList };
};

export default reducer;
