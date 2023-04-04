// Mongoose Model
const Trip = require('../models/Trip');
// GraphQL types
const { GraphQLString, GraphQLList, GraphQLNonNull, GraphQLBoolean, GraphQLInt } = require('graphql');
// User defined types
const { TripType, InputTripInformationType, InputTripReviewType } = require('../types/typeDefs');

const addTrip = {
    type: TripType,
    args: {
        tripName: { type: GraphQLString },
        tripInformation: { type: InputTripInformationType },
        tripKit: { type: GraphQLString },
        tripType: { type: GraphQLString },
        tripRating: { type: GraphQLInt },
        tripStatus: { type: GraphQLBoolean },
        tripReview: { type: GraphQLList(InputTripReviewType) }
    },
    resolve(parent, args) {
        const trip = new Trip({
            tripName: args.tripName,
            tripInformation: args.tripInformation,
            tripKit: args.tripKit,
            tripType: args.tripType,
            tripRating: args.tripRating,
            tripStatus: args.tripStatus,
            tripReview: args.tripReview
        });
        return trip.save()
    }
}

const deleteTrip = {
    type: TripType,
    args: {
        tripName: { type: GraphQLNonNull(GraphQLString) } 
    },
    resolve(parent, args){
        return Trip.findOneAndDelete({ tripName: args.tripName })
    }
}

const updateTrip = {
    type: TripType,
    args: {
        tripName: { type: GraphQLString },
        tripInformation: { type: InputTripInformationType },
        tripKit: { type: GraphQLString },
        tripType: { type: GraphQLString },
        tripRating: { type: GraphQLInt },
        tripStatus: { type: GraphQLBoolean },
        tripReview: { type: GraphQLList(InputTripReviewType) }
    },
    resolve(parent, args){
        return Trip.findOneAndUpdate(
            args.tripName,
            {
                $set: {
                    tripInformation: args.tripInformation,
                    tripKit: args.tripKit,
                    tripType: args.tripType,
                    tripRating: args.tripRating,
                    tripStatus: args.tripStatus,
                    tripReview: args.tripReview
                }
            },
            { new: true }
        );
    }
}

module.exports = {
    addTrip, deleteTrip, updateTrip
}