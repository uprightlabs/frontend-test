import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      recordings: ["hi", "hi2", "hi3"],
      recordingName: ""
    };
  }

  submitRecording = () => {
    this.setState({ recordingName: "" });

    // Add functionality to send to Database
  };

  render() {
    return (
      <div>
        <div className="content">
          <h3 className="header">Recordings</h3>
          <div className="recordingContainer">
            {this.state.recordings.map(recording => (
              <div className="individualRecord">
                <div>{recording}</div>
                <Link className="viewRecording" to="/recordings/:id">
                  View
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="inputBar">
          <input
            className="input"
            type="text"
            placeholder="Recording Name"
            name="recordingName"
            value={this.state.recordingName}
            onChange={e => this.setState({ [e.target.name]: e.target.value })}
          />
          <div className="create" onClick={() => this.submitRecording()}>
            Create
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
