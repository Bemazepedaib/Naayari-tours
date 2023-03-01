//Mongoose models
const Preference = require('../models/Preference');

//GraphQL types
const { 
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLList, 
    GraphQLNonNull,
} = require('graphql');


//Preference type
const PreferenceType = new GraphQLObjectType({
    name: 'Preference',
    fields: () => ({
        id: { type: GraphQLID },
        preferenceType: { type: GraphQLString },
        preferenceDescription: { type: GraphQLString },
        preferenceIcon: { type: GraphQLString }
    })
})

//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        preferences: {
            type: new GraphQLList(PreferenceType),
            resolve(parent, args){
                return Preference.find()
            }
        },
        preference: {
            type: PreferenceType,
            args: { preferenceType: { type: GraphQLString } },
            resolve(parent, args){
                return Preference.findOne({preferenceType: args.preferenceType})
            }
        }
    }
});

//Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        //Add a preference
        addPreference: {
            type: PreferenceType,
            args: {
                preferenceType: { type: GraphQLNonNull(GraphQLString) },
                preferenceDescription: { type: GraphQLNonNull(GraphQLString) },
                preferenceIcon: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args){
                const preference = new Preference({
                    preferenceType: args.preferenceType,
                    preferenceDescription: args.preferenceDescription,
                    preferenceIcon: args.preferenceIcon
                });
                return preference.save()
            }
        },
        //Delete a preference
        deletePreference: {
            type: PreferenceType,
            args: {
                preferenceType: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Preference.findByIdAndDelete({ preferenceType: args.preferenceType })
            }
        },
        //Update a preference
        updatePreference: {
            type: PreferenceType,
            args: {
                preferenceType: { type: GraphQLNonNull(GraphQLString) },
                preferenceDescription: { type: GraphQLNonNull(GraphQLString) },
                preferenceIcon: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Preference.findOneAndUpdate(
                    args.preferenceType,
                    {
                        $set: {
                            preferenceDescription: args.preferenceDescription,
                            preferenceIcon: args.preferenceIcon
                        }
                    },
                    { new: true }
                );
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})