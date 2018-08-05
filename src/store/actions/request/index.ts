import { SET_REQUEST_IN_PROCESS } from '../../constants/actionTypes';
import { action } from 'typesafe-actions';

export const setRequestInProcess = (inProcess: boolean, requestType: string) =>
	action(SET_REQUEST_IN_PROCESS, { inProcess, requestType });

