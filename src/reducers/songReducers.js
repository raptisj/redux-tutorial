import { createReducer, createAction } from "@reduxjs/toolkit";

// Actions
export const addSong = createAction("ADD_SONG");

export const removeSong = createAction("DELETE_SONG");

export const editSong = createAction("EDIT_SONG");

export const updateSong = createAction("UPDATE_SONG", function prepare(
	title,
	index
) {
	return {
		payload: {
			title,
			index
		}
	};
});

export const cancelEdit = createAction("CANCEL_EDIT");

// State
const initialState = {
	songs: [
		{ title: "I love redux", editing: false },
		{ title: "The redux song", editing: false },
		{ title: "Run to the redux hill", editing: false }
	]
};

// Reducer
export default createReducer(initialState, {
	[addSong]: (state, action) => {
		return {
			songs: [action.payload, ...state.songs]
		};
	},
	[removeSong]: (state, action) => {
		return {
			songs: state.songs.filter((s, i) => i !== action.payload)
		};
	},
	[editSong]: (state, action) => {
		return {
			songs: state.songs.map((song, i) =>
				i === action.payload
					? { ...song, editing: true }
					: { ...song, editing: false }
			)
		};
	},
	[updateSong]: (state, action) => {
		const { index, title } = action.payload;
		return {
			songs: state.songs.map((song, i) =>
				i === index ? { ...song, title, editing: false } : song
			)
		};
	},
	[cancelEdit]: (state, action) => {
		return {
			songs: state.songs.map((song, i) =>
				i === action.payload ? { ...song, editing: false } : song
			)
		};
	}
});
