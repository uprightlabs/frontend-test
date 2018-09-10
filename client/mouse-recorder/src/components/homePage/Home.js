import React, { Component } from "react";
import { Link, Router } from "react-router-dom";
import firebase from "../../firebase";
const db = firebase.firestore();

class Home extends Component {
  constructor() {
    super();
    this.state = {
      recordingTitle: "",
      recordingTitles: []
    };
  }

  componentDidMount() {
    // Fetch all recording titles from the firebase DB
    let titles = []; // Firebase requires you to use a placeholder variable before setting values to state
    db.collection("recordings")
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        titles.push(doc.data().title)
      })
    })
    .then(() => this.setState({
      recordingTitles: titles 
    }))
    .catch(err => console.log(err))
  }
  
  componentDidUpdate() {
    // When component updates, refresh the listing of recordings in real-time
    let titles = []; 
    db.collection("recordings")
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        titles.push(doc.data().title)
      })
    })
    .then(() => this.setState({
      recordingTitles: titles, 
    }))
    .catch(err => console.log(err))
  }

  inputValidation = (e) => {
    // on change, check if the format of the new recording title has any illegal spaces, which would create errors with DB queries  
    if (this.state.recordingTitle.includes(" ")) {
      alert("Please do not use spaces when making a recording name.");
      this.setState({ [e.target.name]: "" })
    } else {
      this.setState({ [e.target.name]: e.target.value })
    }
  }

  createRecording = () => {
    // This can only fire when the input field has been validated. Post the entry to DB.
    let recordingTitle = this.state.recordingTitle;
        db.collection("recordings").doc(`${recordingTitle}`).set({
            title: recordingTitle,
        })
  };

  render() {
    return (
      <div>
        <div className="content">
          <h3 className="header">Recordings</h3>
          <div className="recordingContainer">
            {this.state.recordingTitles.map(title => (
              <div className="individualRecord">
                <div>{title}</div><Link className="viewRecording" to={`/viewRecording/${title}`}>View</Link>
              </div>))}
          </div>
        </div>

        <div className="inputBar">
          <input
            className="input"
            type="text"
            placeholder="Recording Name"
            name="recordingTitle"
            value={this.state.recordingTitle}
            onChange={e => this.inputValidation(e)}
          />
          <div className="create" onClick={() => this.createRecording()}>Create</div>
        </div>
      </div>
    );
  }
}

export default Home;
