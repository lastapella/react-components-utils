import { ThunkAction } from 'redux-thunk';
import {
	MERGE_DRIVERS,
	REMOVE_DRIVER_FROM_LIST
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
import { IDriverState, IDriver } from '../../models/driverState';

import * as requestTypes from '../../constants/requestTypes';
import { setRequestInProcess } from '../../actions/request';
import { RootState } from '../../configureStore';

const database = firebaseApp.database();

const normalizeDriversListSnapshot = (
	snapshot: firebase.database.DataSnapshot
) => {
	const result: IDriverState = {};
	snapshot.forEach(childSnapshot => {
		Object.assign(
			result,
			{ ...result },
			{ [childSnapshot.key as string]: { ...childSnapshot.val() } }
		);
		// result.push({ key: childSnapshot.key, ...childSnapshot.val() });
	});
	return result;
};

export const mergeDrivers = (listDrivers: IDriverState) =>
	action(MERGE_DRIVERS, { list: listDrivers });

export const removeDriverFromList = (key: string) =>
	action(REMOVE_DRIVER_FROM_LIST, { key });

export const addDriver: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = (driver: IDriver) => (dispatch, getState) => {
	const requestType = requestTypes.DRIVERS_ADD;
	dispatch(setRequestInProcess(true, requestType));
	return addRef(database, 'drivers/', driver).then(keyAdded => {
		dispatch(
			mergeDrivers({ ...getState().drivers, [keyAdded]: { ...driver } })
		);
		dispatch(setRequestInProcess(false, requestType));
	});
};

export const fetchDriver: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = (driverKey: string) => (dispatch, getState) => {
	const requestType = requestTypes.DRIVERS_FETCH;
	dispatch(setRequestInProcess(true, requestType));
	return readRef(database, 'drivers/' + driverKey).then(snapshot => {
		const syncedDriver = { key: snapshot.key, ...snapshot.val() };
		dispatch(
			mergeDrivers({
				...getState().drivers,
				[snapshot.key as string]: snapshot.val()
			})
		);
		dispatch(setRequestInProcess(false, requestType));
		return syncedDriver;
	});
};

export const editDriver: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = (driverKey: string, driver: IDriver) => (dispatch, getState) => {
	const requestType = requestTypes.DRIVERS_EDIT;
	dispatch(setRequestInProcess(true, requestType));
	return updateRef(database, 'drivers/' + driverKey, driver).then(keyEdited => {
		dispatch(
			mergeDrivers({ ...getState().drivers, [keyEdited]: { ...driver } })
		);
		dispatch(setRequestInProcess(false, requestType));
		return keyEdited;
	});
};

export const deleteDriver: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = (driverKey: string, driver: IDriver) => (dispatch, getState) => {
	const requestType = requestTypes.DRIVERS_DELETE;
	dispatch(setRequestInProcess(true, requestType));
	return removeRef(database, 'drivers/' + driverKey)
		.then(() => {
			dispatch(removeDriverFromList(driverKey));
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

export const fetchAllDriver: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = (driverKey: string) => (dispatch, getState) => {
	const requestType = requestTypes.DRIVERS_FETCHALL;
	dispatch(setRequestInProcess(true, requestType));
	return readRef(database, 'drivers/').then(snapshot => {
		const normalizedSnapshot = normalizeDriversListSnapshot(snapshot);
		console.log(normalizedSnapshot);
		dispatch(mergeDrivers(normalizedSnapshot));
		dispatch(setRequestInProcess(false, requestType));
		return normalizedSnapshot;
	});
};

// export const editDriver = (driverKey: string, driver: any) => (
// 	dispatch,
// 	getState
// ) => {};
// export const fetchDrivers = () => (dispatch, getState) => {};
// export const fetchDriver = (driverKey: string) => (dispatch, getState) => {};

// export const deleteDriver = (driverKey: string) => (dispatch, getState) => {};
