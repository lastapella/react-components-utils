import * as actionTypes from '../../constants/actionTypes';
import * as userActions from '../../actions/user';
import { ActionType } from 'typesafe-actions';
import { Reducer } from 'redux';
import { IUserState } from '../../models';

const initialState: IUserState = { user: null, loading: true };

type UserAction = ActionType<typeof userActions>;

const reducer: Reducer<IUserState, UserAction> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case actionTypes.SET_USER:
			return { user: action.payload.user, loading: false };
	}
	return state;
};

export default reducer;
