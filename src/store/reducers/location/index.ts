import { ActionType } from 'typesafe-actions';
import * as locationActions from '../../actions/location';
import { Reducer } from 'redux';
import {
	MERGE_LOCATIONS,
	REMOVE_LOCATION_FROM_LIST
} from '../../constants/actionTypes';
import { ILocationState } from '../../models';

const initialState: ILocationState = {};

type LocationAction = ActionType<typeof locationActions>;

const reducer: Reducer<ILocationState, LocationAction> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case MERGE_LOCATIONS:
			return mergeLocations(state, action.payload);
		case REMOVE_LOCATION_FROM_LIST:
			return removeLocationFromList(state, action.payload);
	}
	return state;
};

const mergeLocations: (
	state: ILocationState,
	payload: { list: ILocationState }
) => ILocationState = (state, payload) => {
	const { list } = payload;
	return getConcatList(state, list);
};
const removeLocationFromList: (
	state: ILocationState,
	payload: { key: string }
) => ILocationState = (state, payload) => {
	const { key } = payload;
	return removeWithKey(state, key);
};

const removeWithKey = (list: ILocationState, key: string) => {
	const { [key]: _, ...nextState } = list;
	return nextState;
	// return [...list.slice(0, index), ...list.slice(index + 1)];
};
const getConcatList = (currentList: ILocationState, concatList: ILocationState) => {
	return { ...currentList, ...concatList };
};

export default reducer;
