import { ThunkAction } from 'redux-thunk';
import * as _ from 'lodash';
import {
	MERGE_EVENTS,
} from '../../constants/actionTypes';
import { action } from 'typesafe-actions';
import { ActionCreator, Action } from 'redux';
import {
	readRef,
} from '../../../lib/firebase/databaseUtils';
import { firebaseApp } from '../../../lib/firebase/firebase';
import { IEventState, IEvent } from '../../models/eventState';

import * as requestTypes from '../../constants/requestTypes';
import { setRequestInProcess } from '../request';
import { RootState } from '../../configureStore';
import { normalizeSnapshotList } from '../../utils/actions';
import { EVENTS_REF } from '../../constants/firebaseDBRef';

const database = firebaseApp.database();
export const mergeEvents = (listEvents: IEventState) =>
	action(MERGE_EVENTS, { list: listEvents });



export const fetchEventPerGate: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = (gateKey: string) => (dispatch, getState) => {
	const requestType = requestTypes.EVENTS_FETCH;
	dispatch(setRequestInProcess(true, requestType));
	return readRef(database, `${EVENTS_REF}${gateKey}`).then(snapshot => {
		const fetchedEvent = { key: snapshot.key, ...snapshot.val() };
		dispatch(
			mergeEvents({
				...getState().events,
				[snapshot.key as string]: snapshot.val()
			})
		);
		dispatch(setRequestInProcess(false, requestType));
		return fetchedEvent;
	});
};



export const fetchAllEvent: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = () => (dispatch, getState) => {
	const requestType = requestTypes.EVENTS_FETCHALL;
	dispatch(setRequestInProcess(true, requestType));
	return readRef(database, `${EVENTS_REF}`).then(snapshot => {
		const normalizedSnapshot = normalizeSnapshotList<IEventState>(snapshot);
		dispatch(mergeEvents(normalizedSnapshot));
		dispatch(setRequestInProcess(false, requestType));
		return normalizedSnapshot;
	});
};
