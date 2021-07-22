const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sensorSchema = new Schema({
    Room: {
        type:String, 
        required: true
    },
    Motion: {
        type: Number,
        required: true
    },
    Date: {
        type: String, 
        required: true
    },
    Time: {
        type: String, 
        required: true
    }
});

module.exports = mongoose.model('Sensor', sensorSchema);