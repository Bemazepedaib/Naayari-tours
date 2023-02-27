//Mongoose models
const User = require('../models/User');

//GraphQL types
const { 
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLList, 
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLInputObjectType
} = require('graphql');


//Coupon types
const UserCouponType = new GraphQLObjectType({
    name: 'Coupon',
    fields: () => ({
        couponType : { type: GraphQLString },
        couponDescription : { type: GraphQLString },
        couponAmount : { type: GraphQLString }
    })
})

const UserInputCouponType = new GraphQLInputObjectType({
    name: 'InputCoupon',
    fields: () => ({
        couponType : { type: GraphQLString },
        couponDescription : { type: GraphQLString },
        couponAmount : { type: GraphQLString }
    })
})

//Preference types
const UserPreferenceType = new GraphQLObjectType({
    name: 'Preference',
    fields: () => ({
        preferenceType : { type: GraphQLString }
    })
})

const UserInputPreferenceType = new GraphQLInputObjectType({
    name: 'InputPreference',
    fields: () => ({
        preferenceType : { type: GraphQLString }
    })
})

//User type
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id : { type: GraphQLID },
        name : { type: GraphQLString },
        cellphone : { type: GraphQLString },
        birthDate : { type: GraphQLString },
        email : { type: GraphQLString },
        sex : { type: GraphQLString },
        reference : { type: GraphQLString },
        userType : { type: GraphQLString },
        coupons : { type: GraphQLList(UserCouponType) },
        preferences : { type: GraphQLList(UserPreferenceType) },
        userLevel : { type: GraphQLString },
        membership : { type: GraphQLBoolean },
        guideDescription : { type: GraphQLString },
        guidePhoto : { type: GraphQLString },
        guideSpecial : { type: GraphQLString },
        guideState : { type: GraphQLString },
    })
});

//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return User.find()
            }
        },
        user: {
            type: UserType,
            args: { email: { type: GraphQLString } },
            resolve(parent, args){
                return User.findOne({email: args.email})
            }
        }
    }
});

//Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                name : { type: GraphQLNonNull(GraphQLString) },
                cellphone : { type: GraphQLNonNull(GraphQLString) },
                birthDate : { type: GraphQLNonNull(GraphQLString) },
                email : { type: GraphQLNonNull(GraphQLString) },
                sex : { type: GraphQLNonNull(GraphQLString) },
                reference : { type: GraphQLString },
                userType : { type: GraphQLNonNull(GraphQLString) },
                coupons : { type: GraphQLList(UserInputCouponType) },
                preferences : { type: GraphQLList(UserInputPreferenceType) },
                userLevel : { type: GraphQLNonNull(GraphQLString) },
                membership : { type: GraphQLNonNull(GraphQLBoolean) },
                guideDescription : { type: GraphQLString },
                guidePhoto : { type: GraphQLString },
                guideSpecial : { type: GraphQLString },
                guideState : { type: GraphQLString },
            },
            resolve(parent, args){
                const user = new User({
                    name: args.name,
                    cellphone: args.cellphone,
                    birthDate: args.birthDate,
                    email: args.email,
                    sex: args.sex,
                    reference: args.reference,
                    userType: args.userType,
                    coupons: args.coupons,
                    preferences: args.preferences,
                    userLevel: args.userLevel,
                    membership: args.membership,
                    guideDescription: args.guideDescription,
                    guidePhoto: args.guidePhoto,
                    guideSpecial: args.guideSpecial,
                    guideState: args.guideState
                });
                return user.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})