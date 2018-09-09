const mongoose = require('mongoose');

const recorderSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        xCoordinates: {
            type: Array,
            required: true
        },
        yCoordinates: {
            type: Array,
            required: true
        }
    })

const recorderModel = mongoose.model('recording', recorderSchema, 'recordings');
module.exports = recorderModel;