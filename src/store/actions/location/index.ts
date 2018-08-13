import { ThunkAction } from 'redux-thunk';
import * as _ from 'lodash';
import {
	MERGE_LOCATIONS,
	REMOVE_LOCATION_FROM_LIST
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
import { ILocationState, ILocation } from '../../models/locationState';

import * as requestTypes from '../../constants/requestTypes';
import { setRequestInProcess } from '../request';
import { RootState } from '../../configureStore';

const database = firebaseApp.database();

// @TODO DO THIS WITH normalizr https://www.npmjs.com/package/normalizr
const normalizeLocationsListSnapshot = (
	snapshot: firebase.database.DataSnapshot
) => {
	const result: ILocationState = {};
	snapshot.forEach(childSnapshot => {
		Object.assign(
			result,
			{ ...result },
			{ [childSnapshot.key as string]: { ...childSnapshot.val() } }
		);
	});
	return result;
};

export const mergeLocations = (listLocations: ILocationState) =>
	action(MERGE_LOCATIONS, { list: listLocations });

export const removeLocationFromList = (key: string) =>
	action(REMOVE_LOCATION_FROM_LIST, { key });

export const addLocation: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = (location: ILocation) => (dispatch, getState) => {
	const requestType = requestTypes.LOCATIONS_ADD;
	dispatch(setRequestInProcess(true, requestType));
	return addRef(database, 'locations/', location).then(keyAdded => {
		dispatch(mergeLocations({ ...getState().locations, [keyAdded]: { ...location } }));
		dispatch(setRequestInProcess(false, requestType));
		return keyAdded;
	});
};

export const fetchLocation: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = (locationKey: string) => (dispatch, getState) => {
	const requestType = requestTypes.LOCATIONS_FETCH;
	dispatch(setRequestInProcess(true, requestType));
	return readRef(database, 'locations/' + locationKey).then(snapshot => {
		const fetchedLocation = { key: snapshot.key, ...snapshot.val() };
		dispatch(
			mergeLocations({
				...getState().locations,
				[snapshot.key as string]: snapshot.val()
			})
		);
		dispatch(setRequestInProcess(false, requestType));
		return fetchedLocation;
	});
};

export const editLocation: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = (locationKey: string, location: ILocation) => (dispatch, getState) => {
	const requestType = requestTypes.LOCATIONS_EDIT;
	dispatch(setRequestInProcess(true, requestType));
	return updateRef(database, 'locations/' + locationKey, location).then(() => {
		dispatch(mergeLocations({ ...getState().locations, [locationKey]: { ...location } }));
		dispatch(setRequestInProcess(false, requestType));
		return locationKey;
	});
};

export const deleteLocation: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = (locationKey: string) => (dispatch, getState) => {
	const requestType = requestTypes.LOCATIONS_DELETE;
	dispatch(setRequestInProcess(true, requestType));
	return removeRef(database, 'locations/' + locationKey)
		.then(() => {
			dispatch(removeLocationFromList(locationKey));
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

export const fetchAllLocation: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = () => (dispatch, getState) => {
	const requestType = requestTypes.LOCATIONS_FETCHALL;
	dispatch(setRequestInProcess(true, requestType));
	return readRef(database, 'locations/').then(snapshot => {
		const normalizedSnapshot = normalizeLocationsListSnapshot(snapshot);
		dispatch(mergeLocations(normalizedSnapshot));
		dispatch(setRequestInProcess(false, requestType));
		return normalizedSnapshot;
	});
};
