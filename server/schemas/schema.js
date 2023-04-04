//Mutations imports
const { addUser, deleteUser, updateUser } = require('../mutations/userMutations');
const { addTrip, deleteTrip, updateTrip } = require('../mutations/tripMutations');
const { addEvent, deleteEvent, updateEvent } = require('../mutations/eventMutations');
const { addPreference, deletePreference, updatePreference} = require('../mutations/preferenceMutations');
//Querys imports
const { users, user } = require('../querys/userQuerys');
const { trips, trip, tripID } = require('../querys/tripQuerys');
const { events, event } = require('../querys/eventQuerys');
const { preferences, preference} = require('../querys/preferenceQuerys');

//GraphQL types
const { GraphQLObjectType, GraphQLSchema } = require('graphql');

//Querys
const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    fields: {
        users,
        user,
        trips,
        trip,
        tripID,
        events,
        event,
        preferences,
        preference
    }
});

//Mutations
const MutationType = new GraphQLObjectType({
    name: 'MutationType',
    fields: {
        addUser,
        deleteUser,
        updateUser,
        addTrip,
        deleteTrip,
        updateTrip,
        addEvent,
        deleteEvent,
        updateEvent,
        addPreference,
        deletePreference,
        updatePreference
    }
})

module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
})