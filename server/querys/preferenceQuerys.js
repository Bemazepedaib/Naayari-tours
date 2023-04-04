// Mongoose Model
const Preference = require('../models/Preference');
// GraphQL types
const { GraphQLString, GraphQLList } = require('graphql');
// User defined types
const { PreferenceType } = require('../types/typeDefs');

const preferences = {
    type: new GraphQLList(PreferenceType),
    resolve(parent, args){
        return Preference.find()
    }
}

const preference = {
    type: PreferenceType,
    args: { preferenceType: { type: GraphQLString } },
    resolve(parent, args){
        return Preference.findOne({preferenceType: args.preferenceType})
    }
}

module.exports = {
    preferences, preference
}