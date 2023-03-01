const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TripSchema = new Schema({
    id: String,
    tripName: {
        type: String,
        required: true,
        unique: true
    },
    tripInformation: {
        description: {
            type: String,
            required: false
        },
        place: {
            type: String,
            required: false
        },
        price: [{
            priceType: {
                type: String,
                required: true
            },
            priceAmount: {
                type: Number,
                required: true
            }
        }],
        discount: [{
            dateStart: {
                type: String,
                required: false
            },
            dateEnd: {
                type: String,
                required: false
            },
            amount: {
                type: Number,
                required: false
            },
            available: {
                type: Boolean,
                required: false
            }
        }],
        itinerary: {
            type: String,
            required: true
        },
        secuirityAdvice: {
            type: String,
            required: true
        },
        restrictions: {
            type: String,
            required: true
        },
        recomendations: {
            type: String,
            required: true
        },
        photo: {
            type: String,
            required: true
        }
    },
    tripKit: {
        type: String,
        required: true
    },
    tripType: {
        type: String,
        required: true
    },
    tripRating: {
        type: Number,
        required: true
    },
    tripStatus: {
        type: Boolean,
        required: true
    },
    tripReviews: [{
        user: {
            type: String,
            required: false
        },
        rating: {
            type: Number,
            required: false
        },
        review: {
            type: String,
            required: false
        },
        date: {
            type: String,
            required: false
        },
        photo: {
            type: String,
            required: false
        }
    }]
})

module.exports = mongoose.model('Trip', TripSchema)