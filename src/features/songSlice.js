import { createSlice } from '@reduxjs/toolkit';

const songSlice = createSlice({
	name: 'songs',
	initialState: [
		{ title: 'I love redux', editing: false },
		{ title: 'The redux song', editing: false },
		{ title: 'Run to the redux hill', editing: false }
	],
	reducers: {
		addSong: (state, action) => {
			state.push(action.payload);
		},
		removeSong: (state, action) => {
			state.splice(action.payload, 1);
		},
		editSong: (state, action) => {
			const song = state[action.payload];
			song.editing = true;
		},
		updateSong: {
			reducer(state, action) {
				const { title, index } = action.payload;
				const song = state[index];
				song.title = title;
				song.editing = false;
			},
			prepare(title, index) {
				return { payload: { title, index } };
			}
		},
		cancelEdit: (state, action) => {
			const song = state[action.payload];
			song.editing = false;
		}
	}
});

export const { addSong, removeSong, editSong, updateSong, cancelEdit } = songSlice.actions;

export default songSlice.reducer;
