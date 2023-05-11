// Mongoose Model
const Trip = require('../models/Trip');
// GraphQL types
const { GraphQLString, GraphQLList, GraphQLNonNull, GraphQLBoolean, GraphQLInt } = require('graphql');
// User defined types
const { InputTripInformationType, InputTripReviewType } = require('../types/typeDefs');

const addTrip = {
    type: GraphQLString,
    args: {
        tripName: { type: GraphQLString },
        tripInformation: { type: InputTripInformationType },
        tripKit: { type: GraphQLString },
        tripRating: { type: GraphQLInt },
        tripStatus: { type: GraphQLBoolean },
        tripReview: { type: GraphQLList(InputTripReviewType) }
    },
    async resolve(_, { tripName, tripInformation, tripKit, tripRating, tripStatus, tripReview }, { verifiedUser }) {
        if (!verifiedUser) throw new Error("Debes iniciar sesion para realizar esta accion");
        if (verifiedUser.userType !== "admin") throw new Error("Solo un administrador puede agregar viajes");
        const exists = await Trip.findOne({ tripName });
        if (exists) throw new Error("El viaje ya está creado");
        const trip = new Trip({
            tripName, tripInformation,
            tripKit, tripRating,
            tripStatus, tripReview
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
    async resolve(_, { tripName }, { verifiedUser }) {
        if (!verifiedUser) throw new Error("Debes iniciar sesion para realizar esta accion");
        if (verifiedUser.userType !== "admin") throw new Error("Solo un administrador puede eliminar viajes");
        const deleted = await Trip.findOneAndDelete({ tripName });
        if (!deleted) throw new Error("No se pudo eliminar el viaje");
        return "¡Viaje Borrado exitósamente!";
    }
}

const updateTripStatus = {
    type: GraphQLString,
    args: {
        tripName: { type: GraphQLNonNull(GraphQLString) },
        tripStatus: { type: GraphQLNonNull(GraphQLBoolean) }
    },
    async resolve(_, { tripName, tripStatus }, { verifiedUser }) {
        if (!verifiedUser) throw new Error("Debes iniciar sesion para realizar esta accion");
        if (verifiedUser.userType !== "admin") throw new Error("Solo un administrador puede eliminar viajes");
        const updated = await Trip.findOneAndUpdate(
            { tripName },
            { $set: { tripStatus } },
            { new: true }
        );
        if (!updated) throw new Error("No se pudo actualizar el estado del viaje");
        return "¡Estado del viaje actualizdo exitósamente!";
    }
}

const updateTrip = {
    type: GraphQLString,
    args: {
        tripName: { type: GraphQLString },
        tripInformation: { type: InputTripInformationType },
        tripKit: { type: GraphQLString },
        tripRating: { type: GraphQLInt },
        tripStatus: { type: GraphQLBoolean },
        tripReview: { type: GraphQLList(InputTripReviewType) }
    },
    async resolve(_, { tripName, tripInformation, tripKit, tripRating, tripStatus, tripReview }, { verifiedUser }) {
        if (!verifiedUser) throw new Error("Debes iniciar sesion para realizar esta accion");
        if (verifiedUser.userType !== "admin") throw new Error("Solo un administrador puede actualizar los viajes");
        const updated = await Trip.findOneAndUpdate(
            tripName,
            {
                $set: {
                    tripInformation, tripKit,
                    tripRating, tripStatus,
                    tripReview
                }
            },
            { new: true }
        );
        if (!updated) throw new Error("No se pudo actualizar el viaje");
        return "¡Viaje Actualizado exitósamente!";
    }
}

module.exports = {
    addTrip, deleteTrip, updateTripStatus, updateTrip
}