import { ActionType } from 'typesafe-actions';
import * as hardwareDataActions from '../../actions/hardwareData';
import { Reducer } from 'redux';
import { MERGE_HARDWARE_DATA } from '../../constants/actionTypes';
import { IHardwareDataState } from '../../models';
import { getConcatList } from '../../utils/reducers';

const initialState: IHardwareDataState = {};

type HardwareDataAction = ActionType<typeof hardwareDataActions>;

const reducer: Reducer<IHardwareDataState, HardwareDataAction> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case MERGE_HARDWARE_DATA:
			return mergeHardwareData(state, action.payload);
	}
	return state;
};

const mergeHardwareData: (
	state: IHardwareDataState,
	payload: { list: IHardwareDataState }
) => IHardwareDataState = (state, payload) => {
	const { list } = payload;
	return getConcatList(state, list);
};


export default reducer;
