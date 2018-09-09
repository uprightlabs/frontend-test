const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const recorderRouter = require("./Models&Schema/recorderModel.js");

const server = express();

// connect
mongoose
  .connect("mongodb://upright:password0@ds018308.mlab.com:18308/upright-labs-mouse-recorder")
  .then(() => {
    console.log('You connected to the server!!!')
  })
  .catch(error => {
    console.log(error)
});

server.use(cors());
server.use(express.json());;
server.use('/recordings/', recorderRouter());

// node server.js to start server 
server.listen(3000, () => console.log("Listening on port 3000!"));


// setup
// connect to mlab
// deploy to heroku
// deploy to netlify
// connect the two
