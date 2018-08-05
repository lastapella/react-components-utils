import { ActionType } from 'typesafe-actions';
import * as administratorActions from '../../actions/administrators';
import { Reducer } from 'redux';
import {
	MERGE_ADMINISTRATORS,
	REMOVE_ADMINISTRATOR_FROM_LIST
} from '../../constants/actionTypes';
import { IAdministratorState } from '../../models';

const initialState: IAdministratorState = {};

type AdministratorAction = ActionType<typeof administratorActions>;

const reducer: Reducer<IAdministratorState, AdministratorAction> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case MERGE_ADMINISTRATORS:
			return mergeAdministrators(state, action.payload);
		case REMOVE_ADMINISTRATOR_FROM_LIST:
			return removeAdministratorFromList(state, action.payload);
	}
	return state;
};

const mergeAdministrators: (
	state: IAdministratorState,
	payload: { list: IAdministratorState }
) => IAdministratorState = (state, payload) => {
	const { list } = payload;
	return getConcatList(state, list);
};
const removeAdministratorFromList: (
	state: IAdministratorState,
	payload: { key: string }
) => IAdministratorState = (state, payload) => {
	const { key } = payload;
	return removeWithKey(state, key);
};

const removeWithKey = (list: IAdministratorState, key: string) => {
	const { [key]: _, ...nextState } = list;
	return nextState;
	// return [...list.slice(0, index), ...list.slice(index + 1)];
};
const getConcatList = (currentList: IAdministratorState, concatList: IAdministratorState) => {
	return { ...currentList, ...concatList };
};

export default reducer;
