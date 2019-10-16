import React, { Fragment } from 'react'
import { connect } from "react-redux"
import { 
	addSong, 
	removeSong, 
	editSong, 
	updateSong,
	cancelEdit
	 } from '../actions/songActions'

class SongList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      newSong: '',
      currentVal: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.remove = this.remove.bind(this);
    this.edit = this.edit.bind(this);
    this.update = this.update.bind(this);
    this.cancel = this.cancel.bind(this);
    this.updatedVal = this.updatedVal.bind(this);
  }

	onSubmit(e) {
		e.preventDefault();

		const addedSong = {
			title: this.state.newSong
		} 

		this.props.addSong(addedSong);
		this.setState({ newSong: '' });
	}	

	onChange(e) {
    	this.setState({ [e.target.name]: e.target.value });
  	}

	updatedVal(e) {
    	this.setState({ [e.target.name]: e.target.value });
  	}

  	remove(i) {
		this.props.removeSong(i);
	}

	edit(i, title) {
    	this.props.editSong(i);
    	this.setState({ currentVal: title })
	}

  	update(i) {
    	this.props.updateSong(this.state.currentVal, i);
    	this.setState({ currentVal: '' })
	}

	 cancel(i) {
    	this.props.cancelEdit(i);
	}

	render() {
		const { songs } = this.props.songs;
		return (
			<ul>
			{songs.map((song , i) => {
				return (
					<Fragment key={song.title}>
					{(!song.editing) ? (
					<li>
					{song.title}
						<span>
							<button onClick={() => this.remove(i)}>Delete</button>
							<button onClick={() => this.edit(i, song.title)}>Edit</button>
						</span>
					</li>
						) : (
					<li>
 						<form>
							<input 
							type="text" 
							name="currentVal" 
							value={this.state.currentVal} 
							onChange={this.updatedVal}
							/>
						</form>
 						<span>
 							<button onClick={() => this.cancel(i)}>Cancel</button>
 							<button onClick={() => this.update(i)}>Update</button>
						</span>
					</li>
						)}
					</Fragment>
				)
			})}
			<form onSubmit={this.onSubmit}>
				<input 
				type="text" 
				name="newSong" 
				onChange={this.onChange} 
				/>
				<input type="submit" value="Add Song" />
			</form>
			</ul>
		);
	}
}

const mapStateToProps = state => ({
  songs: state.songs
});

export default connect(mapStateToProps, {
	addSong, 
	removeSong, 
	editSong, 
	updateSong, 
	cancelEdit 
})(SongList);