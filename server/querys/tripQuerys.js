// Mongoose Model
const Trip = require('../models/Trip');
// GraphQL types
const { GraphQLString, GraphQLList, GraphQLID } = require('graphql');
// User defined types
const { TripType } = require('../types/typeDefs');

const trips = {
    type: new GraphQLList(TripType),
    resolve(parent, args) {
        return Trip.find()
    }
}

const trip = {
    type: TripType,
    args: { tripName: { type: GraphQLString } },
    resolve(parent, args) {
        return Trip.findOne({ tripName: args.tripName })
    }
}

module.exports = {
    trips, trip
}