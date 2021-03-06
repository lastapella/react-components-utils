import { ThunkAction } from 'redux-thunk';
import * as _ from 'lodash';
import {
	MERGE_DRIVERS,
	REMOVE_DRIVER_FROM_LIST
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
import { IDriverState, IDriver } from '../../models/driverState';

import * as requestTypes from '../../constants/requestTypes';
import { setRequestInProcess } from '../request';
import { RootState } from '../../configureStore';
import { fetchVehicleList, updateVehicleDriversList } from '../vehicle';
import { normalizeSnapshotList } from '../../utils/actions';
import { DRIVERS_REF } from '../../constants/firebaseDBRef';

const database = firebaseApp.database();
export const mergeDrivers = (listDrivers: IDriverState) =>
	action(MERGE_DRIVERS, { list: listDrivers });

export const removeDriverFromList = (key: string) =>
	action(REMOVE_DRIVER_FROM_LIST, { key });

export const addDriver: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = (driver: IDriver) => (dispatch, getState) => {
	const requestType = requestTypes.DRIVERS_ADD;
	dispatch(setRequestInProcess(true, requestType));
	return addRef(database, `${DRIVERS_REF}`, driver).then(keyAdded => {
		dispatch(
			mergeDrivers({ ...getState().drivers, [keyAdded]: { ...driver } })
		);
		dispatch(setRequestInProcess(false, requestType));
		return keyAdded;
	});
};

export const fetchDriver: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = (driverKey: string) => (dispatch, getState) => {
	const requestType = requestTypes.DRIVERS_FETCH;
	dispatch(setRequestInProcess(true, requestType));
	return readRef(database, `${DRIVERS_REF}` + driverKey).then(snapshot => {
		const fetchedDriver = { key: snapshot.key, ...snapshot.val() };
		dispatch(
			mergeDrivers({
				...getState().drivers,
				[snapshot.key as string]: snapshot.val()
			})
		);
		dispatch(fetchVehicleList(fetchedDriver.vehicles));
		dispatch(setRequestInProcess(false, requestType));
		return fetchedDriver;
	});
};

export const editDriver: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = (driverKey: string, driver: IDriver) => (dispatch, getState) => {
	const requestType = requestTypes.DRIVERS_EDIT;
	dispatch(setRequestInProcess(true, requestType));
	return updateRef(database, `${DRIVERS_REF}` + driverKey, driver).then(() => {
		dispatch(
			mergeDrivers({ ...getState().drivers, [driverKey]: { ...driver } })
		);
		dispatch(setRequestInProcess(false, requestType));
		return driverKey;
	});
};

export const deleteDriver: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = (driverKey: string) => (dispatch, getState) => {
	const requestType = requestTypes.DRIVERS_DELETE;
	dispatch(setRequestInProcess(true, requestType));
	const keysVehicleListRemoved = getState().drivers[driverKey].vehicles || [];
	return removeRef(database, `${DRIVERS_REF}` + driverKey)
		.then(() => {
			return Promise.all(
				keysVehicleListRemoved.map(key =>
					dispatch(updateVehicleDriversList(key, driverKey))
				)
			).then(() => {
				dispatch(removeDriverFromList(driverKey));
				dispatch(setRequestInProcess(false, requestType));
				return true;
			});
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
> = () => (dispatch, getState) => {
	const requestType = requestTypes.DRIVERS_FETCHALL;
	dispatch(setRequestInProcess(true, requestType));
	return readRef(database, `${DRIVERS_REF}`).then(snapshot => {
		const normalizedSnapshot = normalizeSnapshotList<IDriverState>(snapshot);
		dispatch(mergeDrivers(normalizedSnapshot));
		dispatch(setRequestInProcess(false, requestType));
		return normalizedSnapshot;
	});
};
