// Mongoose Model
const Event = require('../models/Event');
// GraphQL types
const { GraphQLString, GraphQLList, GraphQLBoolean, GraphQLNonNull } = require('graphql');
// User defined types
const { InputEventUserType, } = require('../types/typeDefs');

const addEvent = {
    type: GraphQLString,
    args: {
        eventDate: { type: GraphQLString },
        eventTrip: { type: GraphQLString },
        eventType: { type: GraphQLString },
        eventStatus: { type: GraphQLBoolean },
        users: { type: GraphQLList(InputEventUserType) }
    },
    async resolve(_, { eventDate, eventTrip, eventType, eventStatus, users }, { verifiedUser }) {
        if (!verifiedUser) throw new Error("Debes iniciar sesion para realizar esta accion");
        if (verifiedUser.userType !== "admin") throw new Error("Solo un administrador puede eliminar eventos");
        const exists = await Event.findOne({ eventDate, eventTrip });
        if (exists) throw new Error("El evento ya está creado");
        const event = new Event({
            eventDate, eventTrip,
            eventType, eventStatus,
            users
        });
        await event.save();
        return "¡Evento creado exitósamente!"
    }
}

const deleteEvent = {
    type: GraphQLString,
    args: {
        eventDate: { type: GraphQLNonNull(GraphQLString) },
        eventTrip: { type: GraphQLNonNull(GraphQLString) }
    },
    async resolve(_, { eventDate, eventTrip }, { verifiedUser }) {
        if (!verifiedUser) throw new Error("Debes iniciar sesion para realizar esta accion");
        if (verifiedUser.userType !== "admin") throw new Error("Solo un administrador puede eliminar eventos");
        const deleted = await Event.findOneAndDelete({ eventDate, eventTrip })
        if (!deleted) throw new Error("No se pudo eliminar el evento");
        return "¡Evento borrado exitósamente!";
    }
}

const updateEventUsers = {
    type: GraphQLString,
    args: {
        eventDate: { type: GraphQLString },
        eventTrip: { type: GraphQLString },
        users: { type: GraphQLList(InputEventUserType) }
    },
    async resolve(_, { eventDate, eventTrip, users }) {
        if (!verifiedUser) throw new Error("Debes iniciar sesion para realizar esta accion");
        const updated = await Event.findOneAndUpdate(
            { eventDate, eventTrip },
            { $push: { users } },
            { new: true }
        );
        if (!updated) throw new Error("No se pudo actualizar el evento");
        return "¡Evento actualizado exitósamente!";
    }
}

const updateEvent = {
    type: GraphQLString,
    args: {
        eventDate: { type: GraphQLString },
        eventTrip: { type: GraphQLString },
        eventType: { type: GraphQLString },
        eventStatus: { type: GraphQLBoolean },
        users: { type: GraphQLList(InputEventUserType) }
    },
    async resolve(_, { eventDate, eventTrip, users }) {
        if (!verifiedUser) throw new Error("Debes iniciar sesion para realizar esta accion");
        if (verifiedUser.userType !== "admin") throw new Error("Solo un administrador puede actualizar eventos");
        const updated = await Event.findOneAndUpdate(
            { eventDate, eventTrip },
            { $set: { 
                eventDate, eventTrip,
                eventType, eventStatus,
                users
            }},
            { new: true }
        );
        if (!updated) throw new Error("No se pudo hacer la reservación correctamente");
        return "¡Su reserva se ha creado exitósamente!";
    }
}

module.exports = {
    addEvent, deleteEvent, updateEvent, updateEventUsers
}