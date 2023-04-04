// Mongoose Model
const Event = require('../models/Event');
// GraphQL types
const { GraphQLString, GraphQLList, GraphQLBoolean, GraphQLNonNull } = require('graphql');
// User defined types
const { EventType, InputEventUserType, } = require('../types/typeDefs');

const addEvent = {
    type: EventType,
    args: {
        eventDate: { type: GraphQLString },
        eventTrip: { type: GraphQLString },
        eventType: { type: GraphQLString },
        eventStatus: { type: GraphQLBoolean },
        users: { type: GraphQLList(InputEventUserType) }
    },
    resolve(parent, args) {
        const event = new Event({
            eventDate: args.eventDate,
            eventTrip: args.eventTrip,
            eventType: args.eventType,
            eventStatus: args.eventStatus,
            users: args.users
        });
        return event.save()
    }
}

const deleteEvent = {
    type: EventType,
    args: {
        eventDate: { type: GraphQLNonNull(GraphQLString) },
        eventTrip: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve(parent, args) {
        return Event.findOneAndDelete({ eventDate: args.eventDate, eventTrip: args.eventTrip })
    }
}

const updateEvent = {
    type: EventType,
    args: {
        eventDate: { type: GraphQLString },
        eventTrip: { type: GraphQLString },
        eventType: { type: GraphQLString },
        eventStatus: { type: GraphQLBoolean },
        users: { type: GraphQLList(InputEventUserType) }
    },
    resolve(parent, args){
        return Event.findOneAndUpdate(
            {eventDate: args.eventDate, eventTrip: args.eventTrip},
            {
                $set: {
                    eventType: args.eventType,
                    eventStatus: args.eventStatus,
                    users: args.users
                }
            },
            { new: true }
        )
    }
}

module.exports = {
    addEvent, deleteEvent, updateEvent
}