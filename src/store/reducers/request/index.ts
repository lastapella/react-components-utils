import * as actionTypes from '../../constants/actionTypes';
import * as requestActions from '../../actions/request';
import { ActionType, getType, isOfType } from 'typesafe-actions';
import { Reducer } from 'redux';
import { PayloadCreator } from 'typesafe-actions/dist/types';

interface IRequestState {
	[key: string]: boolean;
}
const initialState: IRequestState = {};

type RequestAction = ActionType<typeof requestActions>;

const reducer: Reducer<IRequestState, RequestAction> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case actionTypes.SET_REQUEST_IN_PROCESS:
			return setRequestInProcess(state, action);
	}
	return state;
};

const setRequestInProcess = (state: IRequestState, { payload }: RequestAction) => {
	const { inProcess, requestType } = payload;
	const requestObject = {};
	requestObject[requestType] = inProcess;
	return Object.assign({}, state, requestObject);
};

export default reducer;
