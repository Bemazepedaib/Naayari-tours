//GraphQL types
const {
    GraphQLObjectType, GraphQLID,
    GraphQLString, GraphQLSchema,
    GraphQLList, GraphQLNonNull,
    GraphQLBoolean, GraphQLInt,
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

//Activity type
const TripActivityType = new GraphQLObjectType({
    name: 'TripActivity',
    fields: () => ({
        activityName: { type: GraphQLString },
        activityPhoto: { type: GraphQLString }
    })
});

const InputTripActivityType = new GraphQLInputObjectType({
    name: 'InputTripActivity',
    fields: () => ({
        activityName: { type: GraphQLString },
        activityPhoto: { type: GraphQLString }
    })
});

//Information type
const TripInformationType = new GraphQLObjectType({
    name: 'TripInformation',
    fields: () => ({
        description: { type: GraphQLString },
        date: { type: GraphQLList(GraphQLString) },
        place: { type: GraphQLString },
        price: { type: GraphQLList(TripPriceType) },
        duration: { type: GraphQLString },
        activities: { type: GraphQLList(TripActivityType) },
        discount: { type: TripDiscountType },
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
        date: { type: GraphQLList(GraphQLString) },
        place: { type: GraphQLString },
        price: { type: GraphQLList(InputTripPriceType) },
        duration: { type: GraphQLString },
        activities: { type: GraphQLList(InputTripActivityType) },
        discount: { type: InputTripDiscountType },
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
        tripType: { type: GraphQLList(GraphQLString) },
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
        userLevel: { type: GraphQLString },
        membership: { type: GraphQLBoolean },
        verified: { type: GraphQLBoolean },
        coupons: { type: GraphQLList(UserCouponType) },
        preferences: { type: GraphQLList(UserPreferenceType) },
        guideDescription: { type: GraphQLString },
        guidePhoto: { type: GraphQLString },
        guideSpecial: { type: GraphQLString },
        guideState: { type: GraphQLBoolean },
    })
});

module.exports = {
    EventCompanionType, InputEventCompanionType,
    EventUserType, InputEventUserType,
    UserCouponType, InputUserCouponType,
    UserPreferenceType, InputUserPreferenceType,
    TripReviewType, InputTripReviewType,
    TripDiscountType, InputTripDiscountType,
    TripPriceType, InputTripPriceType,
    TripActivityType, InputTripActivityType,
    TripInformationType, InputTripInformationType,
    PreferenceType,
    UserType,
    TripType,
    EventType
}