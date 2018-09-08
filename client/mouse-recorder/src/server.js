// npm install express
const express = require("express");

const app = express();

// test
app.get("/", (req, res) => {
    res.send("test");
});

// Post a sample "test" recording to the db
app.post("/", (req, res) => {
    // Set the recording from state to request body
        // let recording = req.body;
    // send the recording
    res.send("Post works!");
})




// node server.js to start server 
app.listen(3000, () => console.log("Listening on port 3000!"));