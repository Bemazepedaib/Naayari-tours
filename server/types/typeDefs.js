//GraphQL types
const {
    GraphQLObjectType, GraphQLID,
    GraphQLString, GraphQLList,
    GraphQLBoolean, GraphQLInt,
    GraphQLInputObjectType,
    GraphQLFloat
} = require('graphql');

//Companion types
const EventCompanionType = new GraphQLObjectType({
    name: 'EventCompanion',
    fields: () => ({
        companionType: { type: GraphQLString },
        companionName: { type: GraphQLString },
        companionCell: { type: GraphQLString },
        companionBirthdate: { type: GraphQLString }
    })
})

const InputEventCompanionType = new GraphQLInputObjectType({
    name: 'InputEventCompanion',
    fields: () => ({
        companionType: { type: GraphQLString },
        companionName: { type: GraphQLString },
        companionCell: { type: GraphQLString },
        companionBirthdate: { type: GraphQLString }
    })
})

//User types
const EventUserType = new GraphQLObjectType({
    name: 'EventUser',
    fields: () => ({
        userEmail: { type: GraphQLString },
        userName: { type: GraphQLString },
        companion: { type: new GraphQLList(EventCompanionType) },
        advancePayment: { type: GraphQLInt },
        fullPayment: { type: GraphQLInt },
        advancePaid: { type: GraphQLBoolean },
        fullyPaid: { type: GraphQLBoolean },
        observations: { type: GraphQLString }
    })
})

const InputEventUserType = new GraphQLInputObjectType({
    name: 'InputEventUser',
    fields: () => ({
        userEmail: { type: GraphQLString },
        userName: { type: GraphQLString },
        companion: { type: new GraphQLList(InputEventCompanionType) },
        advancePayment: { type: GraphQLInt },
        fullPayment: { type: GraphQLInt },
        advancePaid: { type: GraphQLBoolean },
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

//UserTrip types
const UserTripType = new GraphQLObjectType({
    name: "UserTrip",
    fields: () => ({
        tripDate: { type: GraphQLString },
        tripName: { type: GraphQLString },
        tripStatus: { type: GraphQLString }
    })
})

const InputUserTripType = new GraphQLInputObjectType({
    name: "InputUserTrip",
    fields: () => ({
        tripDate: { type: GraphQLString },
        tripName: { type: GraphQLString },
        tripStatus: { type: GraphQLString }
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
        date: { type: new GraphQLList(GraphQLString) },
        place: { type: GraphQLString },
        price: { type: new GraphQLList(TripPriceType) },
        duration: { type: GraphQLString },
        activities: { type: new GraphQLList(TripActivityType) },
        discount: { type: TripDiscountType },
        itinerary: { type: GraphQLString },
        recomendations: { type: GraphQLString },
        recommendedPlaces: { type: GraphQLString },
        photo: { type: GraphQLString },
    })
});

const InputTripInformationType = new GraphQLInputObjectType({
    name: 'InputTripInformation',
    fields: () => ({
        description: { type: GraphQLString },
        date: { type: new GraphQLList(GraphQLString) },
        place: { type: GraphQLString },
        price: { type: new GraphQLList(InputTripPriceType) },
        duration: { type: GraphQLString },
        activities: { type: new GraphQLList(InputTripActivityType) },
        discount: { type: InputTripDiscountType },
        itinerary: { type: GraphQLString },
        recomendations: { type: GraphQLString },
        recommendedPlaces: { type: GraphQLString },
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

//Request type
const RequestType = new GraphQLObjectType({
    name: 'Request',
    fields: () => ({
        id: { type: GraphQLID },
        requestUser: { type: GraphQLString },
        requestName: { type: GraphQLString },
        requestDate: { type: GraphQLString },
        requestCell: { type: GraphQLString },
        requestTrip: { type: GraphQLString },
        requestStatus: { type: GraphQLString }
    })
});

//Trip type
const TripType = new GraphQLObjectType({
    name: 'Trip',
    fields: () => ({
        id: { type: GraphQLID },
        tripName: { type: GraphQLString },
        tripInformation: { type: TripInformationType },
        tripKit: { type: GraphQLString },
        tripRating: { type: GraphQLFloat },
        tripStatus: { type: GraphQLBoolean },
        tripReview: { type: new GraphQLList(TripReviewType) }
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
        eventStatus: { type: GraphQLString },
        eventGuide: { type: GraphQLString },
        users: { type: new GraphQLList(EventUserType) }
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
        coupons: { type: new GraphQLList(UserCouponType) },
        preferences: { type: new GraphQLList(UserPreferenceType) },
        trips: { type: new GraphQLList(UserTripType) },
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
    UserTripType, InputUserTripType,
    TripReviewType, InputTripReviewType,
    TripDiscountType, InputTripDiscountType,
    TripPriceType, InputTripPriceType,
    TripActivityType, InputTripActivityType,
    TripInformationType, InputTripInformationType,
    PreferenceType,
    UserType,
    TripType,
    EventType,
    RequestType
}