import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Home from './components/homePage/Home';
import Recording from './components/recordingPage/Recording';
import firebase from "./firebase.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="navigationBar"><Link className="logo" to="/">Mouse Tracker</Link></div>
        <Route exact path="/" component={Home} />
        <Route path="/viewRecording/" component={Recording} />
        
      </div>
    );
  }
}

export default App;
