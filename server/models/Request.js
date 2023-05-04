const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
    id: String,
    requestUser: {
        type: String,
        required: true
    },
    requestCell: {
        type: String,
        required: true
    },
    requestDate: {
        type: String,
        required: true
    },
    requestTrip: {
        type: String,
        required: true
    },
    requestStatus: {
        type: String,
        required: true,
        enum: ['pending', 'accepted', 'rejected', 'finished']
    }
})

module.exports = mongoose.model('Request', RequestSchema)