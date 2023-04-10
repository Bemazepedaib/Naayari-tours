// Mongoose Model
const Trip = require('../models/Trip');
// GraphQL types
const { GraphQLString, GraphQLList, GraphQLNonNull, GraphQLBoolean, GraphQLInt } = require('graphql');
// User defined types
const { TripType, InputTripInformationType, InputTripReviewType } = require('../types/typeDefs');

const addTrip = {
    type: GraphQLString,
    args: {
        tripName: { type: GraphQLString },
        tripInformation: { type: InputTripInformationType },
        tripKit: { type: GraphQLString },
        tripType: { type: GraphQLString },
        tripRating: { type: GraphQLInt },
        tripStatus: { type: GraphQLBoolean },
        tripReview: { type: GraphQLList(InputTripReviewType) }
    },
    async resolve(_, { tripName, tripInformation, tripKit, tripType, tripRating, tripStatus, tripReview }, { verifiedUser }) {
        if (!verifiedUser) throw new Error("Debes iniciar sesion para realizar esta accion");
        if (verifiedUser.userType !== "admin") throw new Error("Solo un administrador puede eliminar viajes");
        const exists = await Trip.findOne({ tripName: tripName });
        if (exists) throw new Error("El viaje ya está creado");
        const trip = new Trip({
            tripName, tripInformation,
            tripKit, tripType,
            tripRating, tripStatus,
            tripReview
        });
        await trip.save();
        return "¡Viaje creado exitósamente!";
    }
}

const deleteTrip = {
    type: GraphQLString,
    args: {
        tripName: { type: GraphQLNonNull(GraphQLString) } 
    },
    async resolve(_, { tripName }, { verifiedUser } ){
        if (!verifiedUser) throw new Error("Debes iniciar sesion para realizar esta accion");
        if (verifiedUser.userType !== "admin") throw new Error("Solo un administrador puede eliminar usuarios");
        const deleted = await Trip.findOneAndDelete({ tripName: tripName });
        if (!deleted) throw new Error("No se pudo eliminar el viaje");
        return "¡Viaje Borrado exitósamente!";
    }
}

const updateTrip = {
    type: GraphQLString,
    args: {
        tripName: { type: GraphQLString },
        tripInformation: { type: InputTripInformationType },
        tripKit: { type: GraphQLString },
        tripType: { type: GraphQLString },
        tripRating: { type: GraphQLInt },
        tripStatus: { type: GraphQLBoolean },
        tripReview: { type: GraphQLList(InputTripReviewType) }
    },
    async resolve(_, { tripName, tripInformation, tripKit, tripType, tripRating, tripStatus, tripReview }, { verifiedUser }){
        if (!verifiedUser) throw new Error("Debes iniciar sesion para realizar esta accion");
        if (verifiedUser.userType !== "admin") throw new Error("Solo un administrador puede actualizar los viajes");
        const updated = Trip.findOneAndUpdate(
            tripName,
            {
                $set: {
                    tripInformation, tripKit,
                    tripType, tripRating,
                    tripStatus, tripReview
                }
            },
            { new: true }
        );
        if (!updated) throw new Error("No se pudo actualizar el viaje");
        return "¡Viaje Actualizado exitósamente!";
    }
}

module.exports = {
    addTrip, deleteTrip, updateTrip
}