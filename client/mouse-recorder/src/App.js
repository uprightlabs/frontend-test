import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Home from './components/homePage/Home';
import Recording from './components/recordingPage/Recording';

class App extends Component {
  render() {
    return (
      <div className="App">
      <div className="navigationBar">
          <Link to="/">Mouse Tracker</Link>
          <Route path="/" />
        </div>


        <Route exact path="/" component={Home} />
        <Route path="/recordings/:id" component={Recording} />

      </div>
    );
  }
}

export default App;
