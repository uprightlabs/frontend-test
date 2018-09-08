// npm install express
const express = require("express");
const express = require("cors");

const app = express();

let db = new sqlite3.Database("./db/uprightDB.db");

// Get requests
app.get("/recordings", (req, res) => {
    res.send("test for all recordings");
});

app.get("/recordings/:id", (req, res) => {
    res.send("test for specific recording");
});

// Post requests
let recordingCounter = 1;
app.post("/recordings", (req, res) => {
    // Set the recording from state to request body
    const { xCordinate, yCordinate } = req.body;
    const newRecording = { xCordinate, yCordinate, id: recordingCounter };

    // check if there is a recording:
    if (!recording) {
        res.send("No recording detected")
    };
    
    // send the recording
    res.send("Post works!");
    db.push(newRecording);
    recordingCounter ++;
})

// Delete requests
app.delete("/recordings/:id", (req, res) => {
    const { id } = req.params;
    const foundRecording = recordings.find(recording => recording.id == id);
    
    if (foundRecording) {
        // stuff
        const recordingRemoved = { ...foundRecording };
        // filter db recordings array for all ids that are not equal to the found recording.
        // db.recordings.filter(recordings => recordings.id == id);
    } else {
        res.send("Error, can't find that recording")
    }
})


// node server.js to start server 
app.listen(3000, () => console.log("Listening on port 3000!"));


// sqlite3
// .open testDB.db
// .database 
// main: //Users...

// sqlite3
// .open uprightDB.db
// .database 
// main: //Users...

// table: mouserecord (id, x, y)
// SELECT * FROM mouserecord;
// INSERT INTO mouserecord (id, x, y)