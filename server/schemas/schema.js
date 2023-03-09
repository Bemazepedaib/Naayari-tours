//Mongoose models
const User = require('../models/User');
const Trip = require('../models/Trip');
const Event = require('../models/Event');
const Preference = require('../models/Preference');

//GraphQL types
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLInputObjectType
} = require('graphql');

//Companion types
const EventCompanionType = new GraphQLObjectType({
    name: 'EventCompanion',
    fields: () => ({
        companionName: { type: GraphQLString }
    })
})

const InputEventCompanionType = new GraphQLInputObjectType({
    name: 'InputEventCompanion',
    fields: () => ({
        companionName: { type: GraphQLString }
    })
})

//User types
const EventUserType = new GraphQLObjectType({
    name: 'EventUser',
    fields: () => ({
        userEmail: { type: GraphQLString },
        companion: { type: GraphQLList(EventCompanionType) },
        advancePayment: { type: GraphQLInt },
        fullyPaid: { type: GraphQLBoolean },
        observations: { type: GraphQLString }
    })
})

const InputEventUserType = new GraphQLInputObjectType({
    name: 'InputEventUser',
    fields: () => ({
        userEmail: { type: GraphQLString },
        companion: { type: GraphQLList(InputEventCompanionType) },
        advancePayment: { type: GraphQLInt },
        fullyPaid: { type: GraphQLBoolean },
        observations: { type: GraphQLString }
    })
})

//Coupon types
const UserCouponType = new GraphQLObjectType({
    name: 'Coupon',
    fields: () => ({
        couponType: { type: GraphQLString },
        couponDescription: { type: GraphQLString },
        couponAmount: { type: GraphQLInt },
        couponDate: { type: GraphQLString },
        couponApplied: { type: GraphQLBoolean }
    })
})

const InputUserCouponType = new GraphQLInputObjectType({
    name: 'InputCoupon',
    fields: () => ({
        couponType: { type: GraphQLString },
        couponDescription: { type: GraphQLString },
        couponAmount: { type: GraphQLInt },
        couponDate: { type: GraphQLString },
        couponApplied: { type: GraphQLBoolean }
    })
})

//Preference types
const UserPreferenceType = new GraphQLObjectType({
    name: 'UserPreference',
    fields: () => ({
        preferenceType: { type: GraphQLString }
    })
})

const InputUserPreferenceType = new GraphQLInputObjectType({
    name: 'InputUserPreference',
    fields: () => ({
        preferenceType: { type: GraphQLString }
    })
})

//TripReview type
const TripReviewType = new GraphQLObjectType({
    name: 'TripReview',
    fields: () => ({
        user: { type: GraphQLString },
        rating: { type: GraphQLInt },
        review: { type: GraphQLString },
        date: { type: GraphQLString },
        photo: { type: GraphQLString }
    })
});

const InputTripReviewType = new GraphQLInputObjectType({
    name: 'InputTripReview',
    fields: () => ({
        user: { type: GraphQLString },
        rating: { type: GraphQLInt },
        review: { type: GraphQLString },
        date: { type: GraphQLString },
        photo: { type: GraphQLString }
    })
});

//Discount type
const TripDiscountType = new GraphQLObjectType({
    name: 'TripDiscount',
    fields: () => ({
        dateStart: { type: GraphQLString },
        dateEnd: { type: GraphQLString },
        amount: { type: GraphQLInt },
        available: { type: GraphQLBoolean },
    })
});

const InputTripDiscountType = new GraphQLInputObjectType({
    name: 'InputTripDiscount',
    fields: () => ({
        dateStart: { type: GraphQLString },
        dateEnd: { type: GraphQLString },
        amount: { type: GraphQLInt },
        available: { type: GraphQLBoolean },
    })
});

//Price type
const TripPriceType = new GraphQLObjectType({
    name: 'TripPrice',
    fields: () => ({
        priceType: { type: GraphQLString },
        priceAmount: { type: GraphQLInt }
    })
});

const InputTripPriceType = new GraphQLInputObjectType({
    name: 'InputTripPrice',
    fields: () => ({
        priceType: { type: GraphQLString },
        priceAmount: { type: GraphQLInt }
    })
});

//Information type
const TripInformationType = new GraphQLObjectType({
    name: 'TripInformation',
    fields: () => ({
        description: { type: GraphQLString },
        place: { type: GraphQLString },
        price: { type: GraphQLList(TripPriceType) },
        discount: { type: GraphQLList(TripDiscountType) },
        itinerary: { type: GraphQLString },
        securityAdvice: { type: GraphQLString },
        restrictions: { type: GraphQLString },
        recomendations: { type: GraphQLString },
        photo: { type: GraphQLString },
    })
});

const InputTripInformationType = new GraphQLInputObjectType({
    name: 'InputTripInformation',
    fields: () => ({
        description: { type: GraphQLString },
        place: { type: GraphQLString },
        price: { type: GraphQLList(InputTripPriceType) },
        discount: { type: GraphQLList(InputTripDiscountType) },
        itinerary: { type: GraphQLString },
        securityAdvice: { type: GraphQLString },
        restrictions: { type: GraphQLString },
        recomendations: { type: GraphQLString },
        photo: { type: GraphQLString },
    })
});

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

//Trip type
const TripType = new GraphQLObjectType({
    name: 'Trip',
    fields: () => ({
        id: { type: GraphQLID },
        tripName: { type: GraphQLString },
        tripInformation: { type: TripInformationType },
        tripKit: { type: GraphQLString },
        tripType: { type: GraphQLString },
        tripRating: { type: GraphQLInt },
        tripStatus: { type: GraphQLBoolean },
        tripReview: { type: GraphQLList(TripReviewType) }
    })
});

//Event type
const EventType = new GraphQLObjectType({
    name: 'Event',
    fields: () => ({
        id: { type: GraphQLID },
        eventDate: { type: GraphQLString },
        eventTrip: { type: GraphQLString },
        eventType: { type: GraphQLString },
        eventStatus: { type: GraphQLBoolean },
        users: { type: GraphQLList(EventUserType) }
    })
});

//User type
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        cellphone: { type: GraphQLString },
        birthDate: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        sex: { type: GraphQLString },
        reference: { type: GraphQLString },
        userType: { type: GraphQLString },
        coupons: { type: GraphQLList(UserCouponType) },
        preferences: { type: GraphQLList(UserPreferenceType) },
        userLevel: { type: GraphQLString },
        membership: { type: GraphQLBoolean },
        verified: { type: GraphQLBoolean },
        guideDescription: { type: GraphQLString },
        guidePhoto: { type: GraphQLString },
        guideSpecial: { type: GraphQLString },
        guideState: { type: GraphQLBoolean },
    })
});

//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find()
            }
        },
        user: {
            type: UserType,
            args: { email: { type: GraphQLString } },
            resolve(parent, args) {
                return User.findOne({ email: args.email })
            }
        },
        trips: {
            type: new GraphQLList(TripType),
            resolve(parent, args) {
                return Trip.find()
            }
        },
        trip: {
            type: TripType,
            args: { tripName: { type: GraphQLString } },
            resolve(parent, args) {
                return Trip.findOne({ tripName: args.tripName })
            }
        },
        events: {
            type: new GraphQLList(EventType),
            resolve(parent, args) {
                return Event.find()
            }
        },
        event: {
            type: EventType,
            args: { eventDate: { type: GraphQLString } },
            resolve(parent, args) {
                return Event.find({ eventDate: args.eventDate })
            }
        },
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
        //Add an user
        addUser: {
            type: UserType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                cellphone: { type: GraphQLNonNull(GraphQLString) },
                birthDate: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) },
                sex: { type: GraphQLNonNull(GraphQLString) },
                reference: { type: GraphQLString },
                userType: { type: GraphQLNonNull(GraphQLString) },
                coupons: { type: GraphQLList(InputUserCouponType) },
                preferences: { type: GraphQLList(InputUserPreferenceType) },
                userLevel: { type: GraphQLNonNull(GraphQLString) },
                membership: { type: GraphQLNonNull(GraphQLBoolean) },
                verified: { type: GraphQLBoolean },
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
        },
        //Delete an user
        deleteUser: {
            type: UserType,
            args: {
                email: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return User.findOneAndDelete({ email: args.email })
            }
        },
        //Update an user
        updateUser: {
            type: UserType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                cellphone: { type: GraphQLNonNull(GraphQLString) },
                birthDate: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) },
                sex: { type: GraphQLNonNull(GraphQLString) },
                reference: { type: GraphQLString },
                userType: { type: GraphQLNonNull(GraphQLString) },
                coupons: { type: GraphQLList(InputUserCouponType) },
                preferences: { type: GraphQLList(InputUserPreferenceType) },
                userLevel: { type: GraphQLNonNull(GraphQLString) },
                membership: { type: GraphQLNonNull(GraphQLBoolean) },
                verified: { type: GraphQLBoolean },
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
        },
        //Add a trip
        addTrip: {
            type: TripType,
            args: {
                tripName: { type: GraphQLString },
                tripInformation: { type: InputTripInformationType },
                tripKit: { type: GraphQLString },
                tripType: { type: GraphQLString },
                tripRating: { type: GraphQLInt },
                tripStatus: { type: GraphQLBoolean },
                tripReview: { type: GraphQLList(InputTripReviewType) }
            },
            resolve(parent, args) {
                const trip = new Trip({
                    tripName: args.tripName,
                    tripInformation: args.tripInformation,
                    tripKit: args.tripKit,
                    tripType: args.tripType,
                    tripRating: args.tripRating,
                    tripStatus: args.tripStatus,
                    tripReview: args.tripReview
                });
                return trip.save()
            }
        },
        //Delete a trip
        deleteTrip: {
            type: TripType,
            args: {
                tripName: { type: GraphQLNonNull(GraphQLString) } 
            },
            resolve(parent, args){
                return Trip.findOneAndDelete({ tripName: args.tripName })
            }
        },
        //Update a trip
        updateTrip: {
            type: TripType,
            args: {
                tripName: { type: GraphQLString },
                tripInformation: { type: InputTripInformationType },
                tripKit: { type: GraphQLString },
                tripType: { type: GraphQLString },
                tripRating: { type: GraphQLInt },
                tripStatus: { type: GraphQLBoolean },
                tripReview: { type: GraphQLList(InputTripReviewType) }
            },
            resolve(parent, args){
                return Trip.findOneAndUpdate(
                    args.tripName,
                    {
                        $set: {
                            tripInformation: args.tripInformation,
                            tripKit: args.tripKit,
                            tripType: args.tripType,
                            tripRating: args.tripRating,
                            tripStatus: args.tripStatus,
                            tripReview: args.tripReview
                        }
                    },
                    { new: true }
                );
            }
        },
        //Add an event
        addEvent: {
            type: EventType,
            args: {
                eventDate: { type: GraphQLString },
                eventTrip: { type: GraphQLString },
                eventType: { type: GraphQLString },
                eventStatus: { type: GraphQLBoolean },
                users: { type: GraphQLList(InputEventUserType) }
            },
            resolve(parent, args) {
                const event = new Event({
                    eventDate: args.eventDate,
                    eventTrip: args.eventTrip,
                    eventType: args.eventType,
                    eventStatus: args.eventStatus,
                    users: args.users
                });
                return event.save()
            }
        },
        //Delete an event
        deleteEvent: {
            type: EventType,
            args: {
                eventDate: { type: GraphQLNonNull(GraphQLString) },
                eventTrip: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Event.findOneAndDelete({ eventDate: args.eventDate, eventTrip: args.eventTrip })
            }
        },
        //Update an event
        updateEvent: {
            type: EventType,
            args: {
                eventDate: { type: GraphQLString },
                eventTrip: { type: GraphQLString },
                eventType: { type: GraphQLString },
                eventStatus: { type: GraphQLBoolean },
                users: { type: GraphQLList(InputEventUserType) }
            },
            resolve(parent, args){
                return Event.findOneAndUpdate(
                    {eventDate: args.eventDate, eventTrip: args.eventTrip},
                    {
                        $set: {
                            eventType: args.eventType,
                            eventStatus: args.eventStatus,
                            users: args.users
                        }
                    },
                    { new: true }
                )
            }
        },
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