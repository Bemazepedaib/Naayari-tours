const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PreferenceSchema= new Schema({
    id: String,
    preferenceType: {
        type: String,
        required: true,
        unique: true
    },
    preferenceDescription: {
        type: String,
        required: true
    },
    preferenceIcon: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Preference', PreferenceSchema)