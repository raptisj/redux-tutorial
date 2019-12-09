import React from "react";
import "./App.css";

// Redux
import { Provider } from "react-redux";
// import { createStore } from 'redux'
import { configureStore } from "@reduxjs/toolkit";
import allReducers from "./reducers";

// Components
import SongList from "./components/SongList";

// Set my store
// let store = createStore(allReducers);
const store = configureStore({
	reducer: allReducers
});

function App() {
	return (
		<Provider store={store}>
			<div className="App">
				<h1>Songs(with the help of redux)</h1>
				<SongList />
			</div>
		</Provider>
	);
}

export default App;
