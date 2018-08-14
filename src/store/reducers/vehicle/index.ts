import { ActionType } from 'typesafe-actions';
import * as vehicleActions from '../../actions/vehicle';
import { Reducer } from 'redux';
import {
	MERGE_VEHICLES,
	REMOVE_VEHICLE_FROM_LIST
} from '../../constants/actionTypes';
import { IVehicleState } from '../../models';
import { removeWithKey, getConcatList } from '../../utils/reducers';

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

export default reducer;
