import { ThunkAction } from 'redux-thunk';
import * as _ from 'lodash';
import {
	MERGE_GATES,
	REMOVE_GATE_FROM_LIST
} from '../../constants/actionTypes';
import { action } from 'typesafe-actions';
import { ActionCreator, Action } from 'redux';
import {
	addRef,
	updateRef,
	readRef,
	removeRef
} from '../../../lib/firebase/databaseUtils';
import { firebaseApp } from '../../../lib/firebase/firebase';
import { IGateState, IGate } from '../../models/gateState';

import * as requestTypes from '../../constants/requestTypes';
import { setRequestInProcess } from '../request';
import { RootState } from '../../configureStore';

const database = firebaseApp.database();

// @TODO DO THIS WITH normalizr https://www.npmjs.com/package/normalizr
const normalizeGatesListSnapshot = (
	snapshot: firebase.database.DataSnapshot
) => {
	const result: IGateState = {};
	snapshot.forEach(childSnapshot => {
		Object.assign(
			result,
			{ ...result },
			{ [childSnapshot.key as string]: { ...childSnapshot.val() } }
		);
	});
	return result;
};

export const mergeGates = (listGates: IGateState) =>
	action(MERGE_GATES, { list: listGates });

export const removeGateFromList = (key: string) =>
	action(REMOVE_GATE_FROM_LIST, { key });

export const addGate: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = (gate: IGate) => (dispatch, getState) => {
	const requestType = requestTypes.GATES_ADD;
	dispatch(setRequestInProcess(true, requestType));
	return addRef(database, 'gates/', gate).then(keyAdded => {
		dispatch(mergeGates({ ...getState().gates, [keyAdded]: { ...gate } }));
		dispatch(setRequestInProcess(false, requestType));
		return keyAdded;
	});
};

export const fetchGate: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = (gateKey: string) => (dispatch, getState) => {
	const requestType = requestTypes.GATES_FETCH;
	dispatch(setRequestInProcess(true, requestType));
	return readRef(database, 'gates/' + gateKey).then(snapshot => {
		const fetchedGate = { key: snapshot.key, ...snapshot.val() };
		dispatch(
			mergeGates({
				...getState().gates,
				[snapshot.key as string]: snapshot.val()
			})
		);
		dispatch(setRequestInProcess(false, requestType));
		return fetchedGate;
	});
};

export const editGate: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = (gateKey: string, gate: IGate) => (dispatch, getState) => {
	const requestType = requestTypes.GATES_EDIT;
	dispatch(setRequestInProcess(true, requestType));
	return updateRef(database, 'gates/' + gateKey, gate).then(() => {
		dispatch(mergeGates({ ...getState().gates, [gateKey]: { ...gate } }));
		dispatch(setRequestInProcess(false, requestType));
		return gateKey;
	});
};

export const deleteGate: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = (gateKey: string) => (dispatch, getState) => {
	const requestType = requestTypes.GATES_DELETE;
	dispatch(setRequestInProcess(true, requestType));
	return removeRef(database, 'gates/' + gateKey)
		.then(() => {
			dispatch(removeGateFromList(gateKey));
			dispatch(setRequestInProcess(false, requestType));
			return true;
		})
		.catch(err => {
			if (process.env.NODE_ENV !== 'production') {
				console.log('TODO HANDLE ERR', err);
			}
			return false;
		});
};

export const fetchAllGate: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = () => (dispatch, getState) => {
	const requestType = requestTypes.GATES_FETCHALL;
	dispatch(setRequestInProcess(true, requestType));
	return readRef(database, 'gates/').then(snapshot => {
		const normalizedSnapshot = normalizeGatesListSnapshot(snapshot);
		dispatch(mergeGates(normalizedSnapshot));
		dispatch(setRequestInProcess(false, requestType));
		return normalizedSnapshot;
	});
};
