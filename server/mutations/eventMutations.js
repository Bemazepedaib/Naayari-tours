// Mongoose Model
const Event = require('../models/Event');
// GraphQL types
const { GraphQLString, GraphQLList, GraphQLNonNull, GraphQLBoolean } = require('graphql');
// User defined types
const { InputEventUserType, EventUserType } = require('../types/typeDefs');

const addEvent = {
    type: GraphQLString,
    args: {
        eventDate: { type: GraphQLString },
        eventTrip: { type: GraphQLString },
        eventType: { type: GraphQLString },
        eventStatus: { type: GraphQLString },
        eventGuide: { type: GraphQLString },
        users: { type: GraphQLList(InputEventUserType) }
    },
    async resolve(_, { eventDate, eventTrip, eventType, eventStatus, eventGuide, users }, { verifiedUser }) {
        if (!verifiedUser) throw new Error("Debes iniciar sesion para realizar esta accion");
        if (verifiedUser.userType !== "admin") throw new Error("Solo un administrador puede eliminar eventos");
        const exists = await Event.findOne({ eventDate, eventTrip });
        if (exists) throw new Error("El evento ya está creado");
        const event = new Event({
            eventDate, eventTrip,
            eventType, eventStatus,
            eventGuide, users
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
        users: { type: InputEventUserType }
    },
    async resolve(_, { eventDate, eventTrip, users }, { verifiedUser }) {
        if (!verifiedUser) throw new Error("Inicie sesión para continuar.");
        const exists = await Event.findOne({ eventDate, eventTrip })
        if (!exists) throw new Error("Ha ocurrido un error. Intente de nuevo más tarde por favor.");
        if (exists.users.find(email => email.userEmail === users.userEmail)) throw new Error("No se permite más de una reservación por usuario para el mismo destino.");
        const updated = await Event.findOneAndUpdate(
            { eventDate, eventTrip },
            { $push: { users } },
            { new: true }
        );
        if (!updated) throw new Error("No se pudo actualizar el evento");
        return "¡Reserva creada exitosamente!";
    }
}

const deleteEventUser = {
    type: GraphQLList(EventUserType),
    args: {
        eventDate: { type: GraphQLString },
        eventTrip: { type: GraphQLString },
        user: { type: GraphQLString }
    },
    async resolve(_, { eventDate, eventTrip, user }, { verifiedUser }) {
        if (!verifiedUser) throw new Error("Inicie sesión para continuar.");
        if (verifiedUser.userType !== "admin") throw new Error("Solo un administrador puede eliminar reservas");
        const exists = await Event.findOne({ eventDate, eventTrip })
        if (!exists) throw new Error("Ha ocurrido un error. Intente de nuevo más tarde por favor.");
        const users = exists.users.filter(item => item.userEmail !== user)
        const updated = await Event.findOneAndUpdate(
            { eventDate, eventTrip },
            { $set: { users } },
            { new: true }
        );
        if (!updated) throw new Error("No se pudo eliminar la reserva");
        return users
    }
}

const updateEventUser = {
    type: GraphQLList(EventUserType),
    args: {
        eventDateFrom: { type: GraphQLString },
        eventTripFrom: { type: GraphQLString },
        eventDateTo: { type: GraphQLString },
        eventTripTo: { type: GraphQLString },
        user: { type: GraphQLString }
    },
    async resolve(_, { eventDateFrom, eventTripFrom, eventDateTo, eventTripTo, user }, { verifiedUser }){
        if (!verifiedUser) throw new Error("Inicie sesión para continuar.");
        if (verifiedUser.userType !== "admin") throw new Error("Solo un administrador puede eliminar reservas.");
        const exists = await Event.findOne({ eventDate: eventDateFrom, eventTrip: eventTripFrom })
        if (!exists) throw new Error("Ha ocurrido un error. Intente de nuevo más tarde por favor.");
        const users = exists.users.filter(item => item.userEmail !== user)
        const userPush = exists.users.filter(item => item.userEmail === user)
        const updatedFrom = await Event.findOneAndUpdate(
            { eventDate: eventDateFrom, eventTrip: eventTripFrom },
            { $set: { users } },
            { new: true }
        );
        if (!updatedFrom) throw new Error("¡Algo ha salido mal! Intente de nuevo más tarde.");
        const updatedTo = await Event.findOneAndUpdate(
            { eventDate: eventDateTo, eventTrip: eventTripTo },
            { $push: { users: userPush } },
            { new: true }
        );
        if (!updatedTo) throw new Error("¡Algo ha salido mal! Intente de nuevo más tarde.");
        return users
    }
}

const updateEventUserAdvancePaid = {
    type: GraphQLBoolean,
    args: {
        eventDate: { type: GraphQLString },
        eventTrip: { type: GraphQLString },
        user: { type: GraphQLString },
        newState: { type: GraphQLBoolean },
    },
    async resolve(_, { eventDate, eventTrip, user, newState }, { verifiedUser }) {
        if (!verifiedUser) throw new Error("Inicie sesión para continuar.");
        if (verifiedUser.userType !== "admin") throw new Error("Solo un administrador puede eliminar reservas");
        let exists = await Event.findOne({ eventDate, eventTrip })
        if (!exists) throw new Error("Ha ocurrido un error. Intente de nuevo más tarde por favor.");
        const userIndex = exists.users.findIndex(item => item.userEmail === user)
        exists.users[userIndex].advancePaid = newState
        const updated = await Event.findOneAndUpdate(
            { eventDate, eventTrip },
            { $set: { users: exists.users } },
            { new: true }
        );
        if (!updated) throw new Error("No se pudo eliminar la reserva");
        return exists.users[userIndex].advancePaid
    }
}

const updateEventStatus = {
    type: GraphQLString,
    args: {
        eventDate: { type: GraphQLString },
        eventTrip: { type: GraphQLString },
        eventStatus: { type: GraphQLString }
    },
    async resolve(_, { eventDate, eventTrip, eventStatus }, { verifiedUser }) {
        if (!verifiedUser) throw new Error("Inicie sesión para continuar.");
        if (verifiedUser.userType !== "admin") throw new Error("Solo un administrador puede actualizar el estado de los eventos");
        const exists = await Event.findOne({ eventDate, eventTrip })
        if (!exists) throw new Error("Ha ocurrido un error. Intente de nuevo más tarde por favor.");
        const updated = await Event.findOneAndUpdate(
            { eventDate, eventTrip },
            { $set: { eventStatus } },
            { new: true }
        );
        if (!updated) throw new Error("No se pudo actualizar el evento");
        return eventStatus;
    }
}

const updateEventGuide = {
    type: GraphQLString,
    args: {
        eventDate: { type: GraphQLString },
        eventTrip: { type: GraphQLString },
        eventGuide: { type: GraphQLString }
    },
    async resolve(_, { eventDate, eventTrip, eventGuide }, { verifiedUser }) {
        if (!verifiedUser) throw new Error("Inicie sesión para continuar.");
        if (verifiedUser.userType !== "admin") throw new Error("Solo un administrador puede actualizar el guia asígnado al evento");
        const exists = await Event.findOne({ eventDate, eventTrip })
        if (!exists) throw new Error("Ha ocurrido un error. Intente de nuevo más tarde por favor.");
        const updated = await Event.findOneAndUpdate(
            { eventDate, eventTrip },
            { $set: { eventGuide: eventGuide } },
            { new: true }
        );
        if (!updated) throw new Error("No se pudo actualizar el evento");
        return eventGuide.split("|")[1]
    }
}

const updateEvent = {
    type: GraphQLString,
    args: {
        eventDate: { type: GraphQLString },
        eventTrip: { type: GraphQLString },
        eventType: { type: GraphQLString },
        eventStatus: { type: GraphQLString },
        eventGuide: { type: GraphQLString },
        users: { type: GraphQLList(InputEventUserType) }
    },
    async resolve(_, { eventDate, eventTrip, eventType, eventStatus, eventGuide, users }, { verifiedUser }) {
        if (!verifiedUser) throw new Error("Debes iniciar sesion para realizar esta accion");
        if (verifiedUser.userType !== "admin") throw new Error("Solo un administrador puede actualizar eventos");
        const updated = await Event.findOneAndUpdate(
            { eventDate, eventTrip },
            {
                $set: {
                    eventDate, eventTrip,
                    eventType, eventStatus,
                    eventGuide, users
                }
            },
            { new: true }
        );
        if (!updated) throw new Error("No se pudo hacer la reservación correctamente");
        return "¡Su reserva se ha creado exitósamente!";
    }
}

module.exports = {
    addEvent, deleteEvent, updateEvent, updateEventUsers, deleteEventUser, updateEventUser, updateEventUserAdvancePaid, 
    updateEventStatus, updateEventGuide
}