import { ActionType } from 'typesafe-actions';
import * as eventActions from '../../actions/event';
import { Reducer } from 'redux';
import { MERGE_EVENTS } from '../../constants/actionTypes';
import { IEventState } from '../../models';
import { getConcatList } from '../../utils/reducers';

const initialState: IEventState = {};

type EventAction = ActionType<typeof eventActions>;

const reducer: Reducer<IEventState, EventAction> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case MERGE_EVENTS:
			return mergeEvents(state, action.payload);
	}
	return state;
};

const mergeEvents: (
	state: IEventState,
	payload: { list: IEventState }
) => IEventState = (state, payload) => {
	const { list } = payload;
	return getConcatList(state, list);
};

export default reducer;
