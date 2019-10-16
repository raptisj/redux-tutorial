import { combineReducers } from 'redux';
import songReducers from './songReducers'
	 	
const allReducers = combineReducers({
	songs: songReducers
}); 


export default allReducers;