// Mongoose Model
const Trip = require('../models/Trip');
// GraphQL types
const { GraphQLString, GraphQLList, GraphQLID } = require('graphql');
// User defined types
const { TripType } = require('../types/typeDefs');

const trips = {
    type: new GraphQLList(TripType),
    resolve(_, __) {
        return Trip.find()
    }
}

const trip = {
    type: TripType,
    args: { tripName: { type: GraphQLString } },
    resolve(_, { tripName }) {
        return Trip.findOne({ tripName: tripName })
    }
}

module.exports = {
    trips, trip
}