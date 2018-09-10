// Filter for "check"
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
      xCoordinates: [],
      yCoordinates: [],
      recording: 0,
      queriedXCoordinates: [],
      queriedYCoordinates: [],
      queriedRecordingTitle: [],
    };
  }

    componentDidMount() {
        // Find the unique id of the url by filtering for the substring 
        let path = this.props.location.pathname;
        let recordingPath = path.substr(path.indexOf("/") + 15);

        // Placeholder variables for database content
        let queriedX = [];
        let queriedY = [];
        let queriedT = "";
        
        // Query the DB to find the recording matching the specific path id
        db.collection("recordings").where("title", "==", recordingPath)
        .get()
        .then(query => {
            query.forEach(function(doc) { // Check if this has to be a foreach since i'm querying one document.
                // Set the placeholder variables equal to data from DB 
                // Firebase won't let you automatically set state directly from the query - you have to use a placeholder variable
                // .data() is a firebase method to access all fields from the firebase DB. Specific fields are called from there. 
                queriedX.push(doc.data().xCoordinates);
                queriedY.push(doc.data().yCoordinates);
                queriedT = doc.data().title;
            })
        })
        .then(() => { // Set the state of the app = to the data from firebase. 
            this.setState({ 
                queriedXCoordinates: queriedX[0],
                queriedYCoordinates: queriedY[0],
                queriedRecordingTitle: queriedT,
            })})
        .then(() => {
            // If the DB lacked a previous recording, fade out play button since there's nothing to play.
            document.getElementById("save").classList.add("play");
            if (!this.state.queriedXCoordinates) {
                document.getElementById("play").classList.add("play");
            }
        })
    }

    componentDidUpdate() {
        // whenever the xCoordinates updates (with a recording) fade in the save button to indicate a user may save the recording.
        if (this.state.xCoordinates) {
            document.getElementById("save").classList.remove("play")
        }
    }

    toggleRecord = () => {
        let element = document.getElementById("record");
        let playElement = document.getElementById("play");
        let saveElement = document.getElementById("save");
        let deleteElement = document.getElementById("delete");
        
        // Check if the app is currently recording (1) or not recording (0)
        // if not recording => set recording to 1, add .display styling to button, fade out other buttons, begin recording
        if (this.state.recording === 0) {
            this.setState({ recording: 1, xCoordinates: [], yCoordinates: [] });
            element.classList.add("recording");
            playElement.classList.add("play");
            saveElement.classList.add("play");
            deleteElement.classList.add("play");
        } else {
            // if recording => set recording to 0, remove .display styling from button, fade in other buttons
            this.setState({ recording: 0 });
            element.classList.remove("recording");
            playElement.classList.remove("play");
            saveElement.classList.remove("play");
            deleteElement.classList.remove("play");
        }
        
        // Function to track mouse movements
        const handleMouseMove = event => {
        // If not recording, don't track anything
        if (this.state.recording === 0) { 
            return null;
        } else {
            // If recording, track the x coordinates by pushing each new coordinate to state
            let newXCoordinate = this.state.xCoordinates;
            newXCoordinate.push(event.pageX);
            this.setState(() => ({
                xCoordinates: [...newXCoordinate]}));
            
            // Repeat for the y coordinates
            let newYCoordinate = this.state.yCoordinates;
            newYCoordinate.push(event.pageY);
            this.setState(() => ({
                yCoordinates: [...newYCoordinate]}));
            }
        };
        // Whenever the user is moving the mouse, run the function 
        document.onmousemove = handleMouseMove;
    };

    togglePlay = () => {
        // On click, set inital coordinate values equal to whatever was recorded
        let x = this.state.xCoordinates;
        let y = this.state.yCoordinates;
        
        // If there aren't any recordings, grab a recording from the DB using the unique id 
        if (x.length === 0) {
            let path = this.props.location.pathname;
            let recordingPath = path.split("viewRecording/")[1];
            db.collection("recordings").where("title", "==", recordingPath)
            .get()
            .then(query => {
                query.forEach(function(doc) {
                    x = doc.data().xCoordinates;
                    y = doc.data().yCoordinates;
                    console.log(x, y)
                })
            }).then(() => {
                // If there was a recording in the DB and it was set to state...
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
                    
                    // Toggle the red dot cursor to display 
                    let dot = document.getElementById("cursor");
                    dot.classList.toggle("display");
                    
                    // Test to get the default position of the record button:
                        // console.log(document.getElementById("record").getBoundingClientRect().top) 
                        // console.log(document.getElementById("record").getBoundingClientRect().left)
                    
                    // Set the default position of the dot to the record button (+/- a few pixels)
                    dot.style.left = "130px";
                    dot.style.top = "125px";
                    
                    // Iterate over the x and y coordinate arrays on state. Set the dot's position equal to the next combination
                    let i = 0;
                    let positionChange = setInterval(function() {
                        dot.style.left = x[i] + "px";
                        dot.style.top = y[i] + "px";
                        i++;
                        // When the function reaches the end of the arrays, stop the interval, then reset the formatting of the buttons.
                        if (i === x.length) {
                            clearInterval(positionChange);
                            element.classList.remove("play");
                            playElement.classList.remove("play");
                            saveElement.classList.remove("play");
                            deleteElement.classList.remove("play");
                            dot.classList.toggle("display");
                        }
                    }, 10) // 10ms delay in between position changes so the user can watch the transition, otherwise it computes too quickly. 
                }
            })
        } else {
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
                
                // Toggle the red dot cursor to display 
                let dot = document.getElementById("cursor");
                dot.classList.toggle("display");
                
                // Test to get the default position of the record button:
                    // console.log(document.getElementById("record").getBoundingClientRect().top) 
                    // console.log(document.getElementById("record").getBoundingClientRect().left)
                
                // Set the default position of the dot to the record button (+/- a few pixels)
                dot.style.left = "130px";
                dot.style.top = "125px";
                
                // Iterate over the x and y coordinate arrays on state. Set the dot's position equal to the next combination
                let i = 0;
                let positionChange = setInterval(function() {
                    dot.style.left = x[i] + "px";
                    dot.style.top = y[i] + "px";
                    i++;
                    // When the function reaches the end of the arrays, stop the interval, then reset the formatting of the buttons.
                    if (i === x.length) {
                        clearInterval(positionChange);
                        element.classList.remove("play");
                        playElement.classList.remove("play");
                        saveElement.classList.remove("play");
                        deleteElement.classList.remove("play");
                        dot.classList.toggle("display");
                    }
                }, 10) // 10ms delay in between position changes so the user can watch the transition, otherwise it computes too quickly. 
        }
    }
    }

    saveRecording = () => {
        // On click create  a new document in the DB with the title, x, and y coordinates
        let title = this.state.queriedRecordingTitle;
        db.collection("recordings").doc(`${title}`).set({
            title: title,
            xCoordinates: this.state.xCoordinates,
            yCoordinates: this.state.yCoordinates
        })
        .then(() => {
            document.getElementById("record").classList.remove("play") // remove the fade out from record
        }).then(() => {
            // Set the state of the queried coordinates without doing another get request (saves read time)
            this.setState({
                queriedXCoordinates: this.state.xCoordinates, 
                queriedYCoordinates: this.state.yCoordinates,
            })
        }) 
    }

    deleteRecording = () => {
        // On click delete by Id
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
