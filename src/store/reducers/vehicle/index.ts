import { ActionType } from 'typesafe-actions';
import * as vehicleActions from '../../actions/vehicle';
import { Reducer } from 'redux';
import {
	MERGE_VEHICLES,
	REMOVE_VEHICLE_FROM_LIST
} from '../../constants/actionTypes';
import { IVehicleState } from '../../models';

const initialState: IVehicleState = {};

type VehicleAction = ActionType<typeof vehicleActions>;

const reducer: Reducer<IVehicleState, VehicleAction> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case MERGE_VEHICLES:
			return mergeVehicles(state, action.payload);
		case REMOVE_VEHICLE_FROM_LIST:
			return removeVehicleFromList(state, action.payload);
	}
	return state;
};

const mergeVehicles: (
	state: IVehicleState,
	payload: { list: IVehicleState }
) => IVehicleState = (state, payload) => {
	const { list } = payload;
	return getConcatList(state, list);
};
const removeVehicleFromList: (
	state: IVehicleState,
	payload: { key: string }
) => IVehicleState = (state, payload) => {
	const { key } = payload;
	return removeWithKey(state, key);
};

const removeWithKey = (list: IVehicleState, key: string) => {
	const { [key]: _, ...nextState } = list;
	return nextState;
	// return [...list.slice(0, index), ...list.slice(index + 1)];
};
const getConcatList = (currentList: IVehicleState, concatList: IVehicleState) => {
	return { ...currentList, ...concatList };
};

export default reducer;
