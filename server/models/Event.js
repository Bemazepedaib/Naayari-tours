const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    id: String,
    eventDate: {
        type: String,
        required: true
    },
    eventTrip: {
        type: String,
        required: true
    },
    eventType: {
        type: String,
        required: true
    },
    eventStatus: {
        type: String,
        required: true,
        enum: ['active', 'closed', 'inactive']
    },
    eventGuide: {
        type: String,
        required: true
    },
    users: [{
        userEmail: {
            type: String,
            required: true
        },
        companion: [{
            companionName: {
                type: String,
                required: false
            },
            companionType: {
                type: String,
                required: false
            },
            companionCell: {
                type: String,
                required: false
            }
        }],
        advancePayment: {
            type: Number,
            required: true
        },
        fullPayment: {
            type: Number,
            required: true
        },
        advancePaid: {
            type: Boolean,
            required: true
        },
        fullyPaid: {
            type: Boolean,
            required: true
        },
        observations: {
            type: String,
            required: true
        }
    }]
})

module.exports = mongoose.model('Event', EventSchema)