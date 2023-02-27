const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = require('graphql');

//Event type
const EventType = new GraphQLObjectType({
    name: 'Event',
    fields: () => ({
        _id : { type: GraphQLID },
    })
});

//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        events: {
            type: new GraphQLList(EventType),
            resolve(parent, args){

            }
        },
        event: {
            type: EventType,
            args: { name: { type: GraphQLString } },
            resolve(parent, args){

            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})