import { 
	ADD_SONG,
	DELETE_SONG, 
	EDIT_SONG, 
	UPDATE_SONG,
	CANCEL_EDIT 
} from './types'

export const addSong = (song) => {
	return {
		type: ADD_SONG,
		payload: song
	}
}

export const removeSong = (index) => {
	return {
		type: DELETE_SONG,
		payload: index
	}
}

export const editSong = (index) => {
	return {
		type: EDIT_SONG,
		payload: index
	}
}

export const updateSong = (title, index) => {
	return {
		type: UPDATE_SONG,
		title,
		index
	}
}

export const cancelEdit = (index) => {
	return {
		type: CANCEL_EDIT,
		index
	}
}