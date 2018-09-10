import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { Route } from "react-router-dom";
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
    let titles = []; 
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

  createRecording = () => {
    let recordingTitle = this.state.recordingTitle;
        db.collection("recordings").doc(`${recordingTitle}`).set({
            title: recordingTitle,
        })
        .then(function() {
            console.log("Recording successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
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
            onChange={e => this.setState({ [e.target.name]: e.target.value })}
          />
          <div className="create" onClick={() => this.createRecording()}><Link to={`/viewRecording/${this.state.recordingTitle}`}>Create</Link></div>
        </div>
      </div>
    );
  }
}

export default Home;
