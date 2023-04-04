// Mongoose Model
const User = require('../models/User');
// GraphQL types
const { GraphQLString, GraphQLList, GraphQLNonNull, GraphQLBoolean } = require('graphql');
// User defined types
const { UserType, InputUserCouponType, InputUserPreferenceType } = require('../types/typeDefs');
// Utils
const { generateJWToken } = require('../util/auth')

const login = {
    
}

const addUser = {
    type: UserType,
    args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        cellphone: { type: GraphQLNonNull(GraphQLString) },
        birthDate: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        sex: { type: GraphQLNonNull(GraphQLString) },
        reference: { type: GraphQLNonNull(GraphQLString) },
        userType: { type: GraphQLNonNull(GraphQLString) },
        userLevel: { type: GraphQLNonNull(GraphQLString) },
        membership: { type: GraphQLNonNull(GraphQLBoolean) },
        verified: { type: GraphQLNonNull(GraphQLBoolean) },
        coupons: { type: GraphQLList(InputUserCouponType) },
        preferences: { type: GraphQLList(InputUserPreferenceType) },
        guideDescription: { type: GraphQLString },
        guidePhoto: { type: GraphQLString },
        guideSpecial: { type: GraphQLString },
        guideState: { type: GraphQLBoolean },
    },
    resolve(parent, args) {
        const user = new User({
            name: args.name,
            cellphone: args.cellphone,
            birthDate: args.birthDate,
            email: args.email,
            password: args.password,
            sex: args.sex,
            reference: args.reference,
            userType: args.userType,
            coupons: args.coupons,
            preferences: args.preferences,
            userLevel: args.userLevel,
            membership: args.membership,
            verified: args.verified,
            guideDescription: args.guideDescription,
            guidePhoto: args.guidePhoto,
            guideSpecial: args.guideSpecial,
            guideState: args.guideState
        });
        return user.save()
    }
}

const deleteUser = {
    type: UserType,
    args: {
        email: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve(parent, args) {
        return User.findOneAndDelete({ email: args.email })
    }
}

const updateUser = {
    type: UserType,
    args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        cellphone: { type: GraphQLNonNull(GraphQLString) },
        birthDate: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        sex: { type: GraphQLNonNull(GraphQLString) },
        reference: { type: GraphQLNonNull(GraphQLString) },
        userType: { type: GraphQLNonNull(GraphQLString) },
        userLevel: { type: GraphQLNonNull(GraphQLString) },
        membership: { type: GraphQLNonNull(GraphQLBoolean) },
        verified: { type: GraphQLNonNull(GraphQLBoolean) },
        coupons: { type: GraphQLList(InputUserCouponType) },
        preferences: { type: GraphQLList(InputUserPreferenceType) },                
        guideDescription: { type: GraphQLString },
        guidePhoto: { type: GraphQLString },
        guideSpecial: { type: GraphQLString },
        guideState: { type: GraphQLBoolean },
    },
    resolve(parent, args) {
        return User.findOneAndUpdate(
            { email: args.email, password: args.password },
            {
                $set: {
                    name: args.name,
                    cellphone: args.cellphone,
                    birthDate: args.birthDate,
                    sex: args.sex,
                    reference: args.reference,
                    userType: args.userType,
                    coupons: args.coupons,
                    preferences: args.preferences,
                    userLevel: args.userLevel,
                    membership: args.membership,
                    verified: args.verified,
                    guideDescription: args.guideDescription,
                    guidePhoto: args.guidePhoto,
                    guideSpecial: args.guideSpecial,
                    guideState: args.guideState
                }
            },
            { new: true }
        );
    }
}

module.exports = {
    login, addUser, deleteUser, updateUser
}