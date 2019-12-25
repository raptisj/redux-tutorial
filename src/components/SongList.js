import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { addSong, removeSong, editSong, updateSong, cancelEdit } from '../reducers/songReducers';
import { addSong, removeSong, editSong, updateSong, cancelEdit } from '../features/songSlice';

const SongList = () => {
	const dispatch = useDispatch();
	const [newSong, setNewSong] = useState();
	const [currentVal, setCurrentVal] = useState();
	const { songs } = useSelector(state => state);

	const addNewSong = e => {
		e.preventDefault();

		const addedSong = {
			title: newSong,
			editing: false
		};

		if (addedSong.title) {
			dispatch(addSong(addedSong));
			setNewSong('');
		}
	};

	const remove = i => {
		dispatch(removeSong(i));
	};

	const update = i => {
		dispatch(updateSong(currentVal, i));
		setCurrentVal('');
	};

	const edit = (i, title) => {
		dispatch(editSong(i));
		setCurrentVal(title);
	};

	const cancel = i => {
		dispatch(cancelEdit(i));
	};

	return (
		<ul>
			{songs.map((song, i) => {
				return (
					<Fragment key={song.title}>
						{!song.editing ? (
							<li>
								{song.title}
								<span>
									<button onClick={() => remove(i)}>Delete</button>
									<button onClick={() => edit(i, song.title)}>Edit</button>
								</span>
							</li>
						) : (
							<li>
								<form>
									<input type="text" value={currentVal} onChange={e => setCurrentVal(e.target.value)} />
								</form>
								<span>
									<button onClick={() => cancel(i)}>Cancel</button>
									<button onClick={() => update(i)}>Update</button>
								</span>
							</li>
						)}
					</Fragment>
				);
			})}
			<form onSubmit={addNewSong}>
				<input type="text" onChange={e => setNewSong(e.target.value)} />
				<input type="submit" value="Add Song" />
			</form>
		</ul>
	);
};

export default SongList;
