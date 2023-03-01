//Mongoose models
const Trip = require('../models/Trip');

//GraphQL types
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLInt,
    GraphQLInputObjectType,
    GraphQLBoolean,
    GraphQLNonNull
} = require('graphql');

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

//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
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
        }
    }
});

//Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
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
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})