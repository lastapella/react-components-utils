import { ActionType } from 'typesafe-actions';
import * as gateActions from '../../actions/gate';
import { Reducer } from 'redux';
import {
	MERGE_GATES,
	REMOVE_GATE_FROM_LIST,
	MERGE_LOCATION_GATES
} from '../../constants/actionTypes';
import { IGateState, IGateList } from '../../models';
import { getConcatList, removeWithKey } from '../../utils/reducers';

const initialState: IGateState = {};

type GateAction = ActionType<typeof gateActions>;

const reducer: Reducer<IGateState, GateAction> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case MERGE_LOCATION_GATES:
			return mergeLocationGates(state, action.payload);
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

const mergeLocationGates: (
	state: IGateState,
	payload: { list: IGateList; locationKey: string }
) => IGateState = (state, payload) => {
	const { list, locationKey } = payload;
	return { ...state, [locationKey]: getConcatList(state[locationKey], list) };
};

const removeGateFromList: (
	state: IGateState,
	payload: { gateKey: string; locationKey: string }
) => IGateState = (state, payload) => {
	const { gateKey, locationKey } = payload;
	return {
		...state,
		[locationKey]: removeWithKey(state[locationKey], gateKey)
	};
};

export default reducer;
