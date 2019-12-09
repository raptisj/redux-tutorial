import { createSlice } from "@reduxjs/toolkit";

const songSlice = createSlice({
	name: "songs",
	initialState: {
		songs: [
			{ title: "I love redux", editing: false },
			{ title: "The redux song", editing: false },
			{ title: "Run to the redux hill", editing: false }
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
			return {
				songs: state.songs.map((song, i) =>
					i === action.payload
						? { ...song, editing: true }
						: { ...song, editing: false }
				)
			};
		},
		// updateSong: {
		// 	reducer(state, action) {
		// 		const { title, index } = action.payload;
		// 		const song = state.songs[index];
		// 		// "mutates" the song, but it's safe if we do that with Immer
		// 		song.title = title;
		// 		console.log(song);
		// 	},
		// 	prepare(title, index) {
		// 		return { payload: { title, index } };
		// 	}
		// },
		updateSong: {
			reducer(state, action) {
				const { title, index } = action.payload;
				return {
					songs: state.songs.map((song, i) =>
						i === index ? { ...song, title, editing: false } : song
					)
				};
			},
			prepare(title, index) {
				return { payload: { title, index } };
			}
		},
		cancelEdit: (state, action) => {
			return {
				songs: state.songs.map((song, i) =>
					i === action.payload ? { ...song, editing: false } : song
				)
			};
		}
	}
});

export const {
	addSong,
	removeSong,
	editSong,
	updateSong,
	cancelEdit
} = songSlice.actions;

export default songSlice.reducer;
