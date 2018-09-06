import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      recordings: ["hi", "hi2", "hi3"]
    }
  }
  render() {
    return (
      <div className="App">
        <div className="navigationBar">Mouse Tracker</div>

        <div className="content">
          <h3 className="header">Recordings</h3>
          <div className="recordingContainer">{this.state.recordings.map(recording => <div className="individualRecord"><div>{recording}</div><button>View</button></div>)}</div>
        </div>

        <div className="inputBar">
          <input 
          className="input"
          placeholder="Recording Name" 
          name="input">
          </input>
          <div className="create">Create</div>

        </div>
      </div>
    );
  }
}

export default App;
