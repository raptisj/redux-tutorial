import { createReducer, createAction } from '@reduxjs/toolkit';

// Actions
export const addSong = createAction('ADD_SONG');

export const removeSong = createAction('DELETE_SONG');

export const editSong = createAction('EDIT_SONG');

export const updateSong = createAction('UPDATE_SONG', function prepare(title, index) {
	return {
		payload: {
			title,
			index
		}
	};
});

export const cancelEdit = createAction('CANCEL_EDIT');

// State
const initialState = [
	{ title: 'I love redux', editing: false },
	{ title: 'The redux song', editing: false },
	{ title: 'Run to the redux hill', editing: false }
];

// Reducer
export default createReducer(initialState, {
	[addSong]: (state, action) => {
		state.push(action.payload);
	},
	[removeSong]: (state, action) => {
		state.splice(action.payload, 1);
	},
	[editSong]: (state, action) =>
		state.map((song, i) => (i === action.payload ? { ...song, editing: true } : { ...song, editing: false })),
	[updateSong]: (state, action) =>
		state.map((song, i) =>
			i === action.payload.index ? { ...song, title: action.payload.title, editing: false } : song
		),
	[cancelEdit]: (state, action) => state.map((song, i) => (i === action.payload ? { ...song, editing: false } : song))
});
