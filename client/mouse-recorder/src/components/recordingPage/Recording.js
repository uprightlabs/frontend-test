import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { Route } from "react-router-dom";
import "./recording-styles.css";
import firebase from "../../firebase";
const db = firebase.firestore();

class Recording extends Component {
  constructor() {
    super();
    this.state = {
      xCoordinates: "",
      yCoordinates: "",
      recording: 0,
      queriedXCoordinates: "",
      queriedYCoordinates: "",
      queriedRecordingTitle: "",
    };
  }


    componentDidMount() {
        // Queries the db to find the recording matching the specific path id
        // Sets the queriedTitle, queriedXCordinates, queriedYCordinates to state 
        let path = this.props.location.pathname;
        let recordingPath = path.substr(path.indexOf("/") + 15);
        
        let queriedX = [];
        let queriedY = [];
        let queriedT = "";
        db.collection("recordings").where("title", "==", recordingPath)
        .get()
        .then(query => {
            query.forEach(function(doc) {
                // .data() access all fields from the firebase DB. 
                queriedX.push(doc.data().xCoordinates);
                queriedY.push(doc.data().yCoordinates);
                queriedT = doc.data().title;
            })
        })
        .then(() => {
            this.setState({ 
                queriedXCoordinates: queriedX[0],
                queriedYCoordinates: queriedY[0],
                queriedRecordingTitle: queriedT,
            })})
        .then(() => {
            // If no recording is retreived from DB, fade out play button.
            document.getElementById("save").classList.add("play");
            if (!this.state.queriedXCoordinates) {
                console.log("There is no queried record. Do not press play");
                document.getElementById("play").classList.add("play");
            }
            else console.log("There is a queried record. Press record, play, or delete")
        })
    }

    componentDidUpdate() {
        if (this.state.xCoordinates) {
            document.getElementById("save").classList.remove("play")
        }
    }

    toggleRecord = () => {
        let element = document.getElementById("record");
        let playElement = document.getElementById("play");
        let saveElement = document.getElementById("save");
        let deleteElement = document.getElementById("delete");
        
        // Check if not recording (0) or recording (1)
        // if not recording => set recording to 1, add display to button, fade out other buttons, begin recording
        if (this.state.recording === 0) {
            this.setState({ recording: 1, xCoordinates: [], yCoordinates: [] });
            console.log("Recording!");
            // Toggle the record button to be red
            element.classList.add("recording");
            playElement.classList.add("play");
            saveElement.classList.add("play");
            deleteElement.classList.add("play");
        } else {
            // if recording => set recording to 0, remove display button, fade in other buttons
            this.setState({ recording: 0 });
            console.log("Stop Recording!");
            element.classList.remove("recording");
            playElement.classList.remove("play");
            saveElement.classList.remove("play");
            deleteElement.classList.remove("play");
        }
        
        // While recording, track cursor coordinates and send to state
        const handleMouseMove = event => {
        if (this.state.recording === 0) {
            return null;
        } else {
            // Track the x coordinates on state
            let newXCoordinate = this.state.xCoordinates;
            newXCoordinate.push(event.pageX);
            this.setState(() => ({
                xCoordinates: [...newXCoordinate]}));
            
            // Track the y coordinates on state
            let newYCoordinate = this.state.yCoordinates;
            newYCoordinate.push(event.pageY);
            this.setState(() => ({
                yCoordinates: [...newYCoordinate]}));
            }
        };
        document.onmousemove = handleMouseMove;
    };

    togglePlay = () => {
        // Function to grab the recording by Id
        // iterate over x cordinates array, for each item, set the x coordintate of the div to x[i]
        let x = this.state.xCoordinates;
        let y = this.state.yCoordinates;
        
        if (x.length === 0) {
            let path = this.props.location.pathname;
            let recordingPath = path.substr(path.indexOf("/") + 15);
            db.collection("recordings").where("title", "==", recordingPath)
            .get()
            .then(query => {
                query.forEach(function(doc) {
                    x = doc.data().xCoordinates;
                    y = doc.data().yCoordinates;
                })
            })
        }
        if (x.length > 0) {
            // Toggle the record button to fade away
            let element = document.getElementById("record");
            element.classList.add("play");
            
            // Toggle the play button to fade away
            let playElement = document.getElementById("play");
            playElement.classList.toggle("play");
            
            // Toggle the save button to fade away
            let saveElement = document.getElementById("save");
            saveElement.classList.toggle("play");
            
            // Toggle the delete button to fade away
            let deleteElement = document.getElementById("delete");
            deleteElement.classList.toggle("play");
            
            // Toggle display on red dot div in window
            let dot = document.getElementById("cursor");
            dot.classList.toggle("display");
            console.log(document.getElementById("record").getBoundingClientRect().top, document.getElementById("record").getBoundingClientRect().left)
            dot.style.left = "130px";
            dot.style.top = "125px";
            let i = 0;
            let positionChange = setInterval(function() {
                
                dot.style.left = x[i] + "px";
                dot.style.top = y[i] + "px";
                i++;
                if (i === x.length) {
                    clearInterval(positionChange);
                    // toggle back the button colors
                    element.classList.remove("play");
                    playElement.classList.remove("play");
                    saveElement.classList.remove("play");
                    deleteElement.classList.remove("play");
                    dot.classList.toggle("display");
                }
            }, 10)
        }
    }

    saveRecording = () => {
        // let title = this.state.title;
        let title = this.state.queriedRecordingTitle;
        db.collection("recordings").doc(`${title}`).set({
            title: title,
            xCoordinates: this.state.xCoordinates,
            yCoordinates: this.state.yCoordinates
        })
        .then(() => {
            console.log("Recording successfully written!");
            document.getElementById("record").classList.remove("play")
        }).then(() => {
            this.setState({
                queriedXCoordinates: this.state.xCoordinates,
                queriedYCoordinates: this.state.yCoordinates,
            })
        }) 
    }

    deleteRecording = () => {
        db.collection("recordings").doc(this.state.queriedRecordingTitle).delete()
    };

    render() {
     return (
        <div>
            <h3>Recording: "{this.props.location.pathname.substr(this.props.location.pathname.indexOf("/") + 15)}"</h3>
            <div className="recordingContent">
            <div id="record" onClick={() => this.toggleRecord()}>Record</div>
            <div id="play" onClick={() => this.togglePlay()}>Play</div>
            <div id="save" onClick={() => this.saveRecording()}>Save</div>
            <Link to="/"><div id="delete" onClick={() => this.deleteRecording()}>Delete</div></Link>
            </div>
            <div id="cursor" className="display" />
        </div>
        );
    }
}

export default Recording;
