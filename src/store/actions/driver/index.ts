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
import { IDriverState } from '../../models/driverState';

import * as requestTypes from '../../constants/requestTypes';
import { setRequestInProcess } from '../../actions/request';

const database = firebaseApp.database();

export const mergeDrivers = (listDrivers: IDriverState) =>
	action(MERGE_DRIVERS, { list: listDrivers });

export const removeDriverFromList = (key: string) =>
	action(REMOVE_DRIVER_FROM_LIST, { key });

export const addDriver: ActionCreator<
	ThunkAction<Promise<any>, IDriverState, any, Action>
> = (driver: any) => (dispatch, getState) => {
	console.log(getState());
	const requestType = requestTypes.DRIVERS_ADD;
	dispatch(setRequestInProcess(true, requestType));
	return addRef(database, 'drivers/', driver).then(keyAdded => {
		dispatch(mergeDrivers({ ...getState(), [keyAdded]: { ...driver } }));
		dispatch(setRequestInProcess(false, requestType));
	});
};
// export const editDriver = (driverKey: string, driver: any) => (
// 	dispatch,
// 	getState
// ) => {};
// export const fetchDrivers = () => (dispatch, getState) => {};
// export const fetchDriver = (driverKey: string) => (dispatch, getState) => {};

// export const deleteDriver = (driverKey: string) => (dispatch, getState) => {};
