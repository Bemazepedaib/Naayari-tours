//Mongoose models
const Event = require('../models/Event');

//GraphQL types
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLInputObjectType
} = require('graphql');

//Companion types
const EventCompanionType = new GraphQLObjectType({
    name: 'EventCompanion',
    fields: () => ({
        companionName: { type: GraphQLString }
    })
})

const InputEventCompanionType = new GraphQLInputObjectType({
    name: 'InputEventCompanion',
    fields: () => ({
        companionName: { type: GraphQLString }
    })
})

//User types
const EventUserType = new GraphQLObjectType({
    name: 'EventUser',
    fields: () => ({
        userEmail: { type: GraphQLString },
        companion: { type: GraphQLList(EventCompanionType) },
        advancePayment: { type: GraphQLInt },
        fullyPaid: { type: GraphQLBoolean },
        observations: { type: GraphQLString }
    })
})

const InputEventUserType = new GraphQLInputObjectType({
    name: 'InputEventUser',
    fields: () => ({
        userEmail: { type: GraphQLString },
        companion: { type: GraphQLList(InputEventCompanionType) },
        advancePayment: { type: GraphQLInt },
        fullyPaid: { type: GraphQLBoolean },
        observations: { type: GraphQLString }
    })
})

//Event type
const EventType = new GraphQLObjectType({
    name: 'Event',
    fields: () => ({
        id: { type: GraphQLID },
        eventDate: { type: GraphQLString },
        eventTrip: { type: GraphQLString },
        eventType: { type: GraphQLString },
        eventStatus: { type: GraphQLBoolean },
        users: { type: GraphQLList(EventUserType) }
    })
});

//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        events: {
            type: new GraphQLList(EventType),
            resolve(parent, args) {
                return Event.find()
            }
        },
        event: {
            type: EventType,
            args: { eventDate: { type: GraphQLString } },
            resolve(parent, args) {
                return Event.find({ eventDate: args.eventDate })
            }
        }
    }
});

//Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        //Add an event
        addEvent: {
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
        },
        //Delete an event
        deleteEvent: {
            type: EventType,
            args: {
                eventDate: { type: GraphQLNonNull(GraphQLString) },
                eventTrip: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Event.findOneAndDelete({ eventDate: args.eventDate, eventTrip: args.eventTrip })
            }
        },
        //Update an event
        updateEvent: {
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
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})