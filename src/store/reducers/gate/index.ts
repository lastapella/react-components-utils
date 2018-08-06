import { ActionType } from 'typesafe-actions';
import * as gateActions from '../../actions/gate';
import { Reducer } from 'redux';
import {
	MERGE_GATES,
	REMOVE_GATE_FROM_LIST
} from '../../constants/actionTypes';
import { IGateState } from '../../models';

const initialState: IGateState = {};

type GateAction = ActionType<typeof gateActions>;

const reducer: Reducer<IGateState, GateAction> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case MERGE_GATES:
			return mergeGates(state, action.payload);
		case REMOVE_GATE_FROM_LIST:
			return removeGateFromList(state, action.payload);
	}
	return state;
};

const mergeGates: (
	state: IGateState,
	payload: { list: IGateState }
) => IGateState = (state, payload) => {
	const { list } = payload;
	return getConcatList(state, list);
};
const removeGateFromList: (
	state: IGateState,
	payload: { key: string }
) => IGateState = (state, payload) => {
	const { key } = payload;
	return removeWithKey(state, key);
};

const removeWithKey = (list: IGateState, key: string) => {
	const { [key]: _, ...nextState } = list;
	return nextState;
	// return [...list.slice(0, index), ...list.slice(index + 1)];
};
const getConcatList = (currentList: IGateState, concatList: IGateState) => {
	return { ...currentList, ...concatList };
};

export default reducer;
