// Mongoose Model
const Event = require('../models/Event');
// GraphQL types
const { GraphQLString, GraphQLList } = require('graphql');
// User defined types
const { EventType } = require('../types/typeDefs');

const events = {
    type: new GraphQLList(EventType),
    resolve(parent, args) {
        return Event.find()
    }
}

const event = {
    type: EventType,
    args: { eventDate: { type: GraphQLString } },
    resolve(parent, args) {
        return Event.find({ eventDate: args.eventDate })
    }
}

module.exports = {
    events, event
}