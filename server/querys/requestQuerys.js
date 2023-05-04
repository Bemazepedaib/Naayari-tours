// Mongoose Model
const Request = require('../models/Request');
// GraphQL types
const { GraphQLString, GraphQLList } = require('graphql');
// User defined types
const { RequestType } = require('../types/typeDefs');

const requests = {
    type: new GraphQLList(RequestType),
    resolve(_, __) {
        return Request.find()
    }
}

const request = {
    type: RequestType,
    args: { 
        requestUser: { type: GraphQLString },
    },
    resolve(_, { requestUser }) {
        return Event.findOne({ requestUser })
    }
}

module.exports = {
    requests, request
}