import { createSlice } from '@reduxjs/toolkit';

const songSlice = createSlice({
	name: 'songs',
	initialState: {
		songs: [
			{ title: 'I love redux', editing: false },
			{ title: 'The redux song', editing: false },
			{ title: 'Run to the redux hill', editing: false }
		]
	},
	reducers: {
		addSong: (state, action) => {
			return {
				songs: [action.payload, ...state.songs]
			};
		},
		removeSong: (state, action) => {
			return {
				songs: state.songs.filter((s, i) => i !== action.payload)
			};
		},
		editSong: (state, action) => {
			const song = state.songs[action.payload];
			song.editing = true;
		},
		updateSong: {
			reducer(state, action) {
				const { title, index } = action.payload;
				const song = state.songs[index];
				song.title = title;
				song.editing = false;
			},
			prepare(title, index) {
				return { payload: { title, index } };
			}
		},
		cancelEdit: (state, action) => {
			const song = state.songs[action.payload];
			song.editing = false;
		}
	}
});

export const { addSong, removeSong, editSong, updateSong, cancelEdit } = songSlice.actions;

export default songSlice.reducer;

// updateSong: {
// 	reducer(state, action) {
// 		const { title, index } = action.payload;
// 		return {
// 			songs: state.songs.map((song, i) => (i === index ? { ...song, title, editing: false } : song))
// 		};
// 	},
// 	prepare(title, index) {
// 		return { payload: { title, index } };
// 	}
// },
// cancelEdit: (state, action) => {
// 	return {
// 		songs: state.songs.map((song, i) => (i === action.payload ? { ...song, editing: false } : song))
// 	};
// }
