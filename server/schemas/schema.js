//Mutations imports
const { login, addUser, deleteUser, updateUser, 
        updateUserPassword, updateUserName, updateUserCell,
        updateUserPreferences, updateUserBirth } = require('../mutations/userMutations');
const { addTrip, deleteTrip, updateTrip } = require('../mutations/tripMutations');
const { addEvent, deleteEvent, updateEvent, updateEventUsers } = require('../mutations/eventMutations');
const { addPreference, deletePreference, updatePreference} = require('../mutations/preferenceMutations');
//Querys imports
const { users, user, me } = require('../querys/userQuerys');
const { trips, trip } = require('../querys/tripQuerys');
const { events, event } = require('../querys/eventQuerys');
const { preferences, preference} = require('../querys/preferenceQuerys');

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
        preference
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
        updateTrip,
        addEvent,
        deleteEvent,
        updateEvent,
        updateEventUsers,
        addPreference,
        deletePreference,
        updatePreference
    }
})

module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
})