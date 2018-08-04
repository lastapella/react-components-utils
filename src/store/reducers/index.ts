import { combineReducers } from 'redux';
import request from './request';
import drivers from './driver';

export default combineReducers({
	request,
	drivers
});
