// Mongoose Model
const Preference = require('../models/Preference');
// GraphQL types
const { GraphQLString, GraphQLNonNull } = require('graphql');
// User defined types
const { PreferenceType } = require('../types/typeDefs');

const addPreference = {
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
}

const deletePreference = {
    type: PreferenceType,
    args: {
        preferenceType: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve(parent, args) {
        return Preference.findByIdAndDelete({ preferenceType: args.preferenceType })
    }
}

const updatePreference = {
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

module.exports = {
    addPreference, deletePreference, updatePreference
}