import { combineReducers } from 'redux';
import songs from './songReducers';
// import songs from '../features/songSlice';

const allReducers = combineReducers({
	songs: songs
});

export default allReducers;
