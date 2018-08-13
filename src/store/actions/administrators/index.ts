import { ThunkAction } from 'redux-thunk';
import {
	MERGE_ADMINISTRATORS,
	REMOVE_ADMINISTRATOR_FROM_LIST
} from '../../constants/actionTypes';
import { action } from 'typesafe-actions';
import { Dispatch, ActionCreator, Action } from 'redux';
import {
	addRef,
	updateRef,
	readRef,
	removeRef
} from '../../../lib/firebase/databaseUtils';
import { firebaseApp } from '../../../lib/firebase/firebase';
import getFunctions from '../../../lib/firebase/cloudFunctionsUtils';
import {
	IAdministratorState,
	IAdministrator
} from '../../models/administratorState';

import * as requestTypes from '../../constants/requestTypes';
import { setRequestInProcess } from '../request';
import { RootState } from '../../configureStore';

const firebaseFunctions = getFunctions(firebaseApp.functions());

// @TODO DO THIS WITH normalizr https://www.npmjs.com/package/normalizr
const normalizeAdministratorsList = (snapshot: any[]) => {
	const result: IAdministratorState = {};
	snapshot.forEach(childSnapshot => {
		Object.assign(
			result,
			{ ...result },
			{ [childSnapshot.key as string]: { ...childSnapshot } }
		);
	});
	return result;
};

export const mergeAdministrators = (listAdministrators: IAdministratorState) =>
	action(MERGE_ADMINISTRATORS, { list: listAdministrators });

export const removeAdministratorFromList = (key: string) =>
	action(REMOVE_ADMINISTRATOR_FROM_LIST, { key });

export const addAdministrator: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = (administrator: IAdministrator) => (dispatch, getState) => {
	const requestType = requestTypes.ADMINISTRATORS_ADD;
	dispatch(setRequestInProcess(true, requestType));
	return firebaseFunctions.addAdmin(administrator).then(res => {
		if (res.data.error) {
			throw res.data.error;
		}
		const keyAdded = res.data;
		dispatch(
			mergeAdministrators({
				...getState().administrators,
				[keyAdded]: { ...administrator }
			})
		);
		dispatch(setRequestInProcess(false, requestType));
		return res;
	});
};

export const fetchAdministrator: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = (administratorKey: string) => (dispatch, getState) => {
	const requestType = requestTypes.ADMINISTRATORS_FETCH;
	dispatch(setRequestInProcess(true, requestType));
	return firebaseFunctions.getAdmin({ uid: administratorKey }).then(res => {
		if (res.data.error) {
			throw res.data.error;
		}
		const fetchedAdministrator = { key: administratorKey, ...res.data };
		dispatch(
			mergeAdministrators({
				...getState().administrators,
				[administratorKey as string]: res.data
			})
		);
		dispatch(setRequestInProcess(false, requestType));
		return fetchAdministrator;
	});
};

export const editAdministrator: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = (administratorKey: string, administrator: IAdministrator) => (
	dispatch,
	getState
) => {
	const requestType = requestTypes.ADMINISTRATORS_EDIT;
	dispatch(setRequestInProcess(true, requestType));
	return firebaseFunctions
		.updateAdmin({ uid: administratorKey, ...administrator })
		.then(res => {
			if (res.data.error) {
				throw res.data.error;
			}
			const keyEdited = res.data;
			dispatch(
				mergeAdministrators({
					...getState().administrators,
					[keyEdited]: { ...administrator }
				})
			);
			dispatch(setRequestInProcess(false, requestType));
			return res;
		});
};

export const deleteAdministrator: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = (administratorKey: string) => (dispatch, getState) => {
	const requestType = requestTypes.ADMINISTRATORS_DELETE;
	dispatch(setRequestInProcess(true, requestType));
	return firebaseFunctions
		.deleteAdmin({ uid: administratorKey })
		.then(res => {
			if (res.data.error) {
				throw res.data.error;
			}
			dispatch(removeAdministratorFromList(administratorKey));
			dispatch(setRequestInProcess(false, requestType));
			return { success: true, message: res.data };
		})
		.catch(err => {
			if (process.env.NODE_ENV !== 'production') {
				console.log('TODO HANDLE ERR', err);
			}
			return { success: false, message: err };
		});
};

export const fetchAllAdministrator: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = () => (dispatch, getState) => {
	const requestType = requestTypes.ADMINISTRATORS_FETCHALL;
	dispatch(setRequestInProcess(true, requestType));
	return firebaseFunctions.getAllAdmins().then(res => {
		if (res.data.error) {
			throw res.data.error;
		}
		const normalizedSnapshot = normalizeAdministratorsList(res.data);
		dispatch(mergeAdministrators(normalizedSnapshot));
		dispatch(setRequestInProcess(false, requestType));
		return res;
	});
};
