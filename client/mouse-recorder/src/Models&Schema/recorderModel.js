const express = require('express');

const recorder = require('./recorderSchema.js');

const router = express.Router();

// Post Endpoint
router.post("/", (req, res) => {
    const xCoordinates = req.body.xCoordinates;
    const yCoordinates = req.body.yCoordinates;
    const title = req.body.title;

    const recording = new recorder(req.body);
    recording.save()
    .then(newRecording => {
        res.status(200).json(
            { message: "Succesfully Saved Recording" }, 
            newRecording
        )
    })
    .catch(err => console.log(err))
})

// Get by Id Endpoint
router.get("/:id", (req, res) => {
    const id = req.params.id;

    recorder.findById(id).then(recording => {
        res.status(200).json(recording)
    })
})

// Delete Endpoint
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    recorder.findByIdAndRemove(id).then(recording => {
        res.status(200).json({ 
            message: "successfully deleted recording" 
        })
    }).catch(err => console.log(err))
})

module.exports = router;