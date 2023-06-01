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
            { tripName },
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

const addReview = {
    type: GraphQLString,
    args: {
        tripName: { type: GraphQLString },
        tripReview: { type: InputTripReviewType }
    },
    async resolve(_, { tripName, tripReview }, { verifiedUser }) {
        if (!verifiedUser) throw new Error("Debes iniciar sesion para realizar esta accion");
        const updated = await Trip.findOneAndUpdate(
            { tripName },
            { $push: { tripReview } },
            { new: true }
        );
        if (!updated) throw new Error("No se pudo agregar la reseña");
        return "¡Reseña agregada exitósamente!";
    }
}

const updateDiscount = {
    type: GraphQLString,
    async resolve(_, __) {
        const trips = await Trip.find({ 'tripInformation.discount.available': true });
        const currentDate = new Date().toISOString().split("T")[0].split("-").reverse();
        const promises = trips.map(async (trip) => {
            const dateEnd = trip.tripInformation.discount.dateEnd.split("/");
            const newTripInformation = { ...trip.tripInformation };
            newTripInformation.discount.available = false;

            if (currentDate[1] > dateEnd[1] || (currentDate[1] === dateEnd[1] && currentDate[0] > dateEnd[0])) {
                const updated = await Trip.findOneAndUpdate(
                    { tripName: trip.tripName },
                    { $set: { tripInformation: newTripInformation } },
                    { new: true }
                );

                if (!updated) {
                    throw new Error("No se pudo deshabilitar el descuento");
                }

                return "¡Descuento deshabilitado exitósamente!";
            }
        });
        await Promise.all(promises);
        return "Terminó el proceso de deshabilitar descuentos";
    }
};


module.exports = {
    addTrip, deleteTrip, updateTripStatus, updateTrip, addReview, updateDiscount
}