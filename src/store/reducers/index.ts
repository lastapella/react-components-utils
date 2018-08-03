import { combineReducers } from 'redux';
import request from './request';
import driver from './driver';

export default combineReducers({
	request,
	driver
});
