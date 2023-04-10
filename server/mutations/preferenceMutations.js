// Mongoose Model
const Preference = require('../models/Preference');
// GraphQL types
const { GraphQLString, GraphQLNonNull } = require('graphql');
// User defined types
const { PreferenceType } = require('../types/typeDefs');

const addPreference = {
    type: GraphQLString,
    args: {
        preferenceType: { type: GraphQLNonNull(GraphQLString) },
        preferenceDescription: { type: GraphQLNonNull(GraphQLString) },
        preferenceIcon: { type: GraphQLNonNull(GraphQLString) }
    },
    async resolve(_, { preferenceType, preferenceDescription, preferenceIcon }){
        if (!verifiedUser) throw new Error("Debes iniciar sesion para realizar esta accion");
        if (verifiedUser.userType !== "admin") throw new Error("Solo un administrador puede añadir preferencias");
        const exists = await Event.findOne({ preferenceType: preferenceType });
        if (exists) throw new Error("La preferencia ya está creada");
        const preference = new Preference({
            preferenceType: preferenceType,
            preferenceDescription: preferenceDescription,
            preferenceIcon: preferenceIcon
        });
        await preference.save()
        return "¡Preferencia creada exitósamente!"
    }
}

const deletePreference = {
    type: GraphQLString,
    args: {
        preferenceType: { type: GraphQLNonNull(GraphQLString) }
    },
    async resolve(_, { preferenceType }) {
        if (!verifiedUser) throw new Error("Debes iniciar sesion para realizar esta accion");
        if (verifiedUser.userType !== "admin") throw new Error("Solo un administrador puede eliminar preferencias");
        const deleted = await Preference.findOneAndDelete({ preferenceType: preferenceType });
        if (!deleted) throw new Error("No se pudo eliminar la preferencia");
        return "¡Preferencia eliminada exitósamente!"
    }
}

const updatePreference = {
    type: GraphQLString,
    args: {
        preferenceType: { type: GraphQLNonNull(GraphQLString) },
        preferenceDescription: { type: GraphQLNonNull(GraphQLString) },
        preferenceIcon: { type: GraphQLNonNull(GraphQLString) }
    },
    async resolve(_, { preferenceType, preferenceDescription, preferenceIcon }) {
        if (!verifiedUser) throw new Error("Debes iniciar sesion para realizar esta accion");
        if (verifiedUser.userType !== "admin") throw new Error("Solo un administrador puede actualizar preferencias");
        const updated = await Preference.findOneAndUpdate(
            preferenceType,
            {
                $set: {
                    preferenceDescription: preferenceDescription,
                    preferenceIcon: preferenceIcon
                }
            },
            { new: true }
        );
        if (!updated) throw new Error("No se pudo actualizar la preferencia");
        return "¡Preferencia actualizado exitósamente!";
    }
}

module.exports = {
    addPreference, deletePreference, updatePreference
}