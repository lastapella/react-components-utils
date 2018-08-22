import { ThunkAction } from 'redux-thunk';
import { action } from 'typesafe-actions';
import { ActionCreator, Action } from 'redux';
import {
	addRef,
	updateRef,
	readRef,
	removeRef
} from '../../../lib/firebase/databaseUtils';
import { firebaseApp } from '../../../lib/firebase/firebase';

import { IVehicleState, IVehicle } from '../../models/vehicleState';
import {
	MERGE_VEHICLES,
	REMOVE_VEHICLE_FROM_LIST
} from '../../constants/actionTypes';
import * as requestTypes from '../../constants/requestTypes';

import { setRequestInProcess } from '../request';
import { RootState } from '../../configureStore';
import { VEHICLES_REF } from '../../constants/firebaseDBRef';
import { normalizeSnapshotList } from '../../utils/actions';

const database = firebaseApp.database();

export const mergeVehicles = (listVehicles: { [key: string]: IVehicle }) =>
	action(MERGE_VEHICLES, { list: listVehicles });

export const removeVehicleFromList = (key: string) =>
	action(REMOVE_VEHICLE_FROM_LIST, { key });

export const addVehicle: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = (vehicle: IVehicle) => (dispatch, getState) => {
	const requestType = requestTypes.VEHICLES_ADD;
	dispatch(setRequestInProcess(true, requestType));
	return addRef(database, `${VEHICLES_REF}`, vehicle, vehicle.iunumber).then(
		keyAdded => {
			dispatch(
				mergeVehicles({ ...getState().vehicles, [keyAdded]: { ...vehicle } })
			);
			dispatch(setRequestInProcess(false, requestType));
		}
	);
};

export const fetchVehicle: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = (vehicleKey: string) => (dispatch, getState) => {
	const requestType = `${requestTypes.VEHICLES_FETCH}/${vehicleKey}`;
	dispatch(setRequestInProcess(true, requestType));
	return readRef(database, `${VEHICLES_REF}` + vehicleKey).then(snapshot => {
		const fetchedVehicle = {
			[snapshot.key as string]: snapshot.val() as IVehicle
		};
		dispatch(
			mergeVehicles({
				...getState().vehicles,
				...fetchedVehicle
			})
		);
		dispatch(setRequestInProcess(false, requestType));
		return fetchedVehicle;
	});
};

export const editVehicle: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = (vehicleKey: string, vehicle: IVehicle) => (dispatch, getState) => {
	const requestType = requestTypes.VEHICLES_EDIT;
	dispatch(setRequestInProcess(true, requestType));
	return updateRef(database, `${VEHICLES_REF}` + vehicleKey, vehicle).then(
		() => {
			dispatch(
				mergeVehicles({ ...getState().vehicles, [vehicleKey]: { ...vehicle } })
			);
			dispatch(setRequestInProcess(false, requestType));
			return vehicleKey;
		}
	);
};

export const deleteVehicle: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = (vehicleKey: string) => (dispatch, getState) => {
	const requestType = requestTypes.VEHICLES_DELETE;
	dispatch(setRequestInProcess(true, requestType));
	return removeRef(database, `${VEHICLES_REF}` + vehicleKey)
		.then(() => {
			dispatch(removeVehicleFromList(vehicleKey));
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

export const fetchVehicleList: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = (vehicleKeyList: string[]) => (dispatch, getState) => {
	const requestType = requestTypes.VEHICLES_FETCHLIST;
	dispatch(setRequestInProcess(true, requestType));
	return Promise.all(
		vehicleKeyList
			? vehicleKeyList.map(vehicleKey => {
					return dispatch(fetchVehicle(vehicleKey));
			  })
			: [Promise.resolve()]
	).then(values => {
		dispatch(setRequestInProcess(false, requestType));
		return values;
	});
};

export const addOrUpdateVehicle: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = (vehicleKey: string, vehicleValue: IVehicle, driverKey: string) => (
	dispatch,
	getState
) => {
	return dispatch(fetchVehicle(vehicleKey))
		.then(vehicle => {
			// EDIT
			// If driver doesn't exist in the drivers list we add it
			vehicleValue.drivers = vehicle[vehicleKey].drivers.includes(driverKey)
				? [...vehicle[vehicleKey].drivers]
				: [...vehicle[vehicleKey].drivers, driverKey];
			return dispatch(editVehicle(vehicleKey, vehicleValue));
		})
		.catch(err => {
			// ADD
			vehicleValue.drivers = [driverKey];
			return dispatch(addVehicle(vehicleValue));
		});
};

export const addOrUpdateVehiclesList: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = (
	vehiclesListAdded: IVehicle[],
	driverKey: string,
	keysVehicleListRemoved: string[] = []
) => (dispatch, getState) => {
	return Promise.all([
		...vehiclesListAdded.map(vehicle => {
			return dispatch(addOrUpdateVehicle(vehicle.iunumber, vehicle, driverKey));
		}),
		...keysVehicleListRemoved.map(key =>
			dispatch(updateVehicleDriversList(key, driverKey))
		)
	]);
};
export const updateVehicleDriversList: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = (key: string, driverKey: string) => (dispatch, getState) => {
	const stateVehicle = getState().vehicles[key];
	if (
		stateVehicle.drivers.length === 1 &&
		stateVehicle.drivers[0] === driverKey
	) {
		return dispatch(deleteVehicle(key));
	} else {
		return dispatch(
			editVehicle(key, {
				...stateVehicle,
				drivers: stateVehicle.drivers.filter(driverId => driverId !== driverKey)
			})
		);
	}
};

export const fetchAllVehicles: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = () => (dispatch, getState) => {
	const driverState = getState().drivers;
	const requestType = requestTypes.VEHICLES_FETCHALL;
	dispatch(setRequestInProcess(true, requestType));
	return readRef(database, `${VEHICLES_REF}`).then(snapshot => {
		const normalizedSnapshot = normalizeSnapshotList<IVehicleState>(snapshot);
		dispatch(mergeVehicles(normalizedSnapshot));
		dispatch(setRequestInProcess(false, requestType));
	});
	// const vehicleKeyList = getState().drivers
};
