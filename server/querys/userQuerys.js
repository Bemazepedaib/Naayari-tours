// Mongoose Model
const User = require('../models/User');
// GraphQL types
const { GraphQLString, GraphQLList } = require('graphql');
// User defined types
const { UserType } = require('../types/typeDefs');

const users = {
    type: GraphQLList(UserType),
    resolve(_, __) {
        return User.find()
    }
}

const user = {
    type: UserType,
    args: { email: { type: GraphQLString } },
    resolve(_, { email }) {
        return User.findOne({ email: email })
    }
}

const me = {
    type: UserType,
    args: {},
    resolve(_, __, { verifiedUser }) {
        if (!verifiedUser) throw new Error("Debes iniciar sesion para realizar esta accion");
        const usr = User.findOne({ email: verifiedUser.email })
        return usr
    }
}

module.exports = {
    users, user, me
}