// Mongoose Model
const Preference = require('../models/Preference');
// GraphQL types
const { GraphQLString, GraphQLList } = require('graphql');
// User defined types
const { PreferenceType } = require('../types/typeDefs');

const preferences = {
    type: new GraphQLList(PreferenceType),
    resolve(_, __){
        return Preference.find()
    }
}

const preference = {
    type: PreferenceType,
    args: { preferenceType: { type: GraphQLString } },
    resolve(_, { preferenceType }){
        return Preference.findOne({ preferenceType: preferenceType })
    }
}

module.exports = {
    preferences, preference
}