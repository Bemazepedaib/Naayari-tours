//Mutations imports
const { login, addUser, deleteUser, updateUser, 
        updateUserPassword, updateUserName, updateUserCell,
        updateUserPreferences, updateUserBirth } = require('../mutations/userMutations');
const { addTrip, deleteTrip, updateTripStatus, updateTrip } = require('../mutations/tripMutations');
const { addEvent, deleteEvent, updateEvent, updateEventUsers, deleteEventUser, updateEventUser, updateEventStatus } = require('../mutations/eventMutations');
const { addPreference, deletePreference, updatePreference} = require('../mutations/preferenceMutations');
const { addRequest, deleteRequest, updateRequest } = require('../mutations/requestMutations')
//Querys imports
const { users, user, me } = require('../querys/userQuerys');
const { trips, trip } = require('../querys/tripQuerys');
const { events, event } = require('../querys/eventQuerys');
const { preferences, preference} = require('../querys/preferenceQuerys');
const { requests, request} = require('../querys/requestQuerys');

//GraphQL types
const { GraphQLObjectType, GraphQLSchema } = require('graphql');

//Querys
const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    fields: {
        me,
        users,
        user,
        trips,
        trip,
        events,
        event,
        preferences,
        preference,
        requests,
        request
    }
});

//Mutations
const MutationType = new GraphQLObjectType({
    name: 'MutationType',
    fields: {
        login,
        addUser,
        deleteUser,
        updateUser,
        updateUserPassword, 
        updateUserName, 
        updateUserCell,
        updateUserPreferences, 
        updateUserBirth,
        addTrip,
        deleteTrip,
        updateTripStatus,
        updateTrip,
        addEvent,
        deleteEvent,
        updateEvent,
        updateEventUsers,
        deleteEventUser,
        updateEventUser,
        updateEventStatus,
        addPreference,
        deletePreference,
        updatePreference,
        addRequest,
        deleteRequest,
        updateRequest
    }
})

module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
})