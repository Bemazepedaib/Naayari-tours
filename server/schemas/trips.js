const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = require('graphql');

//Trip type
const TripType = new GraphQLObjectType({
    name: 'Trip',
    fields: () => ({
        _id : { type: GraphQLID },
    })
});

//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        trips: {
            type: new GraphQLList(TripType),
            resolve(parent, args){

            }
        },
        trip: {
            type: TripType,
            args: { name: { type: GraphQLString } },
            resolve(parent, args){

            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})