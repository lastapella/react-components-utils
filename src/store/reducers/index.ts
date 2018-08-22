import { combineReducers } from 'redux';
import request from './request';
import drivers from './driver';
import administrators from './administrators';
import vehicles from './vehicle';
import gates from './gate';
import locations from './location';
import user from './user';
import event from './event';
import hardwareData from './hardwareData';

export default combineReducers({
	request,
	drivers,
	administrators,
	vehicles,
	gates,
	locations,
	user,
	event,
	hardwareData
});
