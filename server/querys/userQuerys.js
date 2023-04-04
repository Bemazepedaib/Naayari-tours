// Mongoose Model
const User = require('../models/User');
// GraphQL types
const { GraphQLString, GraphQLList } = require('graphql');
// User defined types
const { UserType } = require('../types/typeDefs');

const users = {
    type: new GraphQLList(UserType),
    resolve(parent, args) {
        return User.find()
    }
}

const user = {
    type: UserType,
    args: { email: { type: GraphQLString } },
    resolve(parent, args) {
        return User.findOne({ email: args.email })
    }
}

module.exports = {
    users, user
}