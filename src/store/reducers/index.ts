import { combineReducers } from 'redux';
import request from './request';
import drivers from './driver';
import administrators from './administrators';

export default combineReducers({
	request,
	drivers,
	administrators
});
