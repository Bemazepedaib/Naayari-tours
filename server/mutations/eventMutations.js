// Mongoose Model
const Event = require('../models/Event');
// GraphQL types
const { GraphQLString, GraphQLList, GraphQLBoolean, GraphQLNonNull } = require('graphql');
// User defined types
const { EventType, InputEventUserType, } = require('../types/typeDefs');

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
        const exists = await Event.findOne({ eventDate: eventDate, eventTrip: eventTrip });
        if (exists) throw new Error("El evento ya está creado");
        const event = new Event({
            eventDate: eventDate,
            eventTrip: eventTrip,
            eventType: eventType,
            eventStatus: eventStatus,
            users: users
        });
        await event.save();
        return "¡Evento creado exitósamente!"
    }
}

const deleteEvent = {
    type: EventType,
    args: {
        eventDate: { type: GraphQLNonNull(GraphQLString) },
        eventTrip: { type: GraphQLNonNull(GraphQLString) }
    },
    async resolve(_, { eventDate, eventTrip }, { verifiedUser }) {
        if (!verifiedUser) throw new Error("Debes iniciar sesion para realizar esta accion");
        if (verifiedUser.userType !== "admin") throw new Error("Solo un administrador puede eliminar eventos");
        const deleted = await Event.findOneAndDelete({ eventDate: eventDate, eventTrip: eventTrip })
        if (!deleted) throw new Error("No se pudo eliminar el evento");
        return "¡Evento borrado exitósamente!";
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
    async resolve(_, { eventDate, eventTrip, eventType, eventStatus, users }) {
        if (!verifiedUser) throw new Error("Debes iniciar sesion para realizar esta accion");
        if (verifiedUser.userType !== "admin") throw new Error("Solo un administrador puede actualizar eventos");
        const updated = await Event.findOneAndUpdate(
            { eventDate: eventDate, eventTrip: eventTrip },
            {
                $set: {
                    eventType: eventType,
                    eventStatus: eventStatus,
                    users: users
                }
            },
            { new: true }
        );
        if (!updated) throw new Error("No se pudo actualizar el evento");
        return "¡Evento actualizado exitósamente!";
    }
}

module.exports = {
    addEvent, deleteEvent, updateEvent
}