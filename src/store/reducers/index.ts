import { combineReducers } from 'redux';
import request from './request';
import drivers from './driver';
import administrators from './administrators';
import vehicles from './vehicle';
import gates from './gate';

export default combineReducers({
	request,
	drivers,
	administrators,
	vehicles,
	gates
});
