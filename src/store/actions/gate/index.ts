import { ThunkAction } from 'redux-thunk';
import * as _ from 'lodash';
import {
	MERGE_GATES,
	REMOVE_GATE_FROM_LIST,
	MERGE_LOCATION_GATES
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
import { IGateState, IGate, IGateList } from '../../models/gateState';

import * as requestTypes from '../../constants/requestTypes';
import { setRequestInProcess } from '../request';
import { RootState } from '../../configureStore';
import { normalizeSnapshotList } from '../../utils/actions';

const database = firebaseApp.database();

export const mergeLocationGates = (listGates: IGateList, locationKey: string) =>
	action(MERGE_LOCATION_GATES, { list: listGates, locationKey });

export const mergeGates = (listGates: IGateState) =>
	action(MERGE_GATES, { list: listGates });

export const removeGateFromList = (locationKey: string, gateKey: string) =>
	action(REMOVE_GATE_FROM_LIST, { locationKey, gateKey });

export const addGate: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = (locationKey: string, gate: IGate) => (dispatch, getState) => {
	const requestType = requestTypes.GATES_ADD;
	dispatch(setRequestInProcess(true, requestType));
	return addRef(database, `gates/${locationKey}/`, gate).then(keyAdded => {
		dispatch(
			mergeLocationGates(
				{ ...getState().gates[locationKey], [keyAdded]: { ...gate } },
				locationKey
			)
		);
		dispatch(setRequestInProcess(false, requestType));
		return keyAdded;
	});
};

export const fetchGate: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = (locationKey: string, gateKey: string) => (dispatch, getState) => {
	const requestType = requestTypes.GATES_FETCH;
	dispatch(setRequestInProcess(true, requestType));
	return readRef(database, `gates/${locationKey}/${gateKey}`).then(snapshot => {
		const fetchedGate = { key: snapshot.key, ...snapshot.val() };
		dispatch(
			mergeLocationGates(
				{
					...getState().gates[locationKey],
					[snapshot.key as string]: snapshot.val()
				},
				locationKey
			)
		);
		dispatch(setRequestInProcess(false, requestType));
		return fetchedGate;
	});
};

export const editGate: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = (locationKey: string, gateKey: string, gate: IGate) => (
	dispatch,
	getState
) => {
	const requestType = requestTypes.GATES_EDIT;
	dispatch(setRequestInProcess(true, requestType));
	return updateRef(database, `gates/${locationKey}/${gateKey}`, gate).then(
		() => {
			dispatch(
				mergeLocationGates(
					{ ...getState().gates[locationKey], [gateKey]: { ...gate } },
					locationKey
				)
			);
			dispatch(setRequestInProcess(false, requestType));
			return gateKey;
		}
	);
};

export const deleteGate: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = (locationKey: string, gateKey: string) => (dispatch, getState) => {
	const requestType = requestTypes.GATES_DELETE;
	dispatch(setRequestInProcess(true, requestType));
	return removeRef(database, `gates/${locationKey}/${gateKey}`)
		.then(() => {
			dispatch(removeGateFromList(locationKey, gateKey));
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
> = (locationKey?: string) => (dispatch, getState) => {
	const requestType = requestTypes.GATES_FETCHALL;
	dispatch(setRequestInProcess(true, requestType));
	if (locationKey) {
		return readRef(database, `gates/${locationKey}/`).then(snapshot => {
			const normalizedSnapshot = normalizeSnapshotList<IGateList>(snapshot);
			dispatch(mergeLocationGates(normalizedSnapshot, locationKey));
			dispatch(setRequestInProcess(false, requestType));
			return normalizedSnapshot;
		});
	} else {
		return readRef(database, `gates/`).then(snapshot => {
			const normalizedSnapshot = normalizeSnapshotList<IGateState>(snapshot);
			dispatch(mergeGates(normalizedSnapshot));
			dispatch(setRequestInProcess(false, requestType));
			return normalizedSnapshot;
		});
	}
};
