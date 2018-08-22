import { ThunkAction } from 'redux-thunk';
import * as _ from 'lodash';
import {
	MERGE_HARDWARE_DATA,
} from '../../constants/actionTypes';
import { action } from 'typesafe-actions';
import { ActionCreator, Action } from 'redux';
import {
	readRef,
} from '../../../lib/firebase/databaseUtils';
import { firebaseApp } from '../../../lib/firebase/firebase';
import { IHardwareDataState, IHardwareData } from '../../models/hardwareDataState';

import * as requestTypes from '../../constants/requestTypes';
import { setRequestInProcess } from '../request';
import { RootState } from '../../configureStore';
import { normalizeSnapshotList } from '../../utils/actions';
import { HARDWARE_DATA_REF } from '../../constants/firebaseDBRef';

const database = firebaseApp.database();
export const mergeHardwareData = (listHardwareData: IHardwareDataState) =>
	action(MERGE_HARDWARE_DATA, { list: listHardwareData });



export const fetchHardwareDataPerGate: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = (gateKey: string) => (dispatch, getState) => {
	const requestType = requestTypes.HARDWARE_DATA_FETCH;
	dispatch(setRequestInProcess(true, requestType));
	return readRef(database, `${HARDWARE_DATA_REF}${gateKey}`).then(snapshot => {
		const fetchedHardwareData = { key: snapshot.key, ...snapshot.val() };
		dispatch(
			mergeHardwareData({
    ...getState().hardwareData,
				[snapshot.key as string]: snapshot.val()
			})
		);
		dispatch(setRequestInProcess(false, requestType));
		return fetchedHardwareData;
	});
};



export const fetchAllHardwareData: ActionCreator<
	ThunkAction<Promise<any>, RootState, any, Action>
> = () => (dispatch, getState) => {
	const requestType = requestTypes.HARDWARE_DATA_FETCHALL;
	dispatch(setRequestInProcess(true, requestType));
	return readRef(database, `${HARDWARE_DATA_REF}`).then(snapshot => {
		const normalizedSnapshot = normalizeSnapshotList<IHardwareDataState>(snapshot);
		dispatch(mergeHardwareData(normalizedSnapshot));
		dispatch(setRequestInProcess(false, requestType));
		return normalizedSnapshot;
	});
};
