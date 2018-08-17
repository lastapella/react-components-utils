import { ThunkAction } from 'redux-thunk';
import { ActionCreator, Action } from 'redux';
import { firebaseApp } from '../../../lib/firebase/firebase';
import { RootState } from '../../configureStore';
import { SET_USER } from '../../constants/actionTypes';
import { action } from 'typesafe-actions';

export const setUser = (user: firebase.User | null) =>
	action(SET_USER, { user });

export const subscribeAuth: ActionCreator<
	ThunkAction<Promise<firebase.Unsubscribe>, RootState, any, Action>
> = () => (dispatch, getState) => {
	return new Promise((resolve, reject) =>
		resolve(
			firebaseApp.auth().onAuthStateChanged(authUser => {
				dispatch(setUser(authUser));
			})
		)
	);
};
