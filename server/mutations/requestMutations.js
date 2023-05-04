// Mongoose Model
const Request = require('../models/Request');
// GraphQL types
const { GraphQLString, GraphQLNonNull } = require('graphql');

const addRequest = {
    type: GraphQLString,
    args: {
        requestUser: { type: GraphQLNonNull(GraphQLString) },
        requestCell: { type: GraphQLNonNull(GraphQLString) },
        requestDate: { type: GraphQLNonNull(GraphQLString) },
        requestTrip: { type: GraphQLNonNull(GraphQLString) },
        requestStatus: { type: GraphQLNonNull(GraphQLString) },
    },
    async resolve(_, { requestUser, requestCell, requestDate, requestTrip, requestStatus }, { verifiedUser }) {
        if (!verifiedUser) throw new Error("Debes iniciar sesion para realizar esta accion");
        const exists = await Request.findOne({ requestUser });
        let newRequest = null
        if (exists) {
            const requests = await Request.find({ requestUser });
            requests.map(request => {
                if (request.requestStatus === "pending" || request.requestStatus === "accepted") throw new Error("No se permiten múltiples solicitudes");
            })
            newRequest = new Request({
                requestUser, requestCell, 
                requestDate, requestTrip,
                requestStatus
            })
        } else {
            newRequest = new Request({
                requestUser, requestCell, 
                requestDate, requestTrip,
                requestStatus
            })
        }
        const saved = await newRequest.save();
        if (!saved) throw new Error("Algo ha salido mal, intente de nuevo más tarde")
        return "¡Solicitud creada exitósamente! Espere a que un administrador apruebe la solicitud."
    }
}

const deleteRequest = {
    type: GraphQLString,
    args: {
        requestUser: { type: GraphQLNonNull(GraphQLString) }
    },
    async resolve(_, { requestUser }, { verifiedUser }) {
        if (!verifiedUser) throw new Error("Debes iniciar sesion para realizar esta accion");
        if (verifiedUser.userType !== "admin") throw new Error("Solo un administrador puede eliminar solicitudes");
        const deleted = await Request.findOneAndDelete({ requestUser });
        if (!deleted) throw new Error("No se pudo eliminar la solicitud");
        return "¡Usuario borrado exitósamente!";
    }
}

const updateRequest = {
    type: GraphQLString,
    args: {
        requestUser: { type: GraphQLNonNull(GraphQLString) },
        requestStatus: { type: GraphQLNonNull(GraphQLString) },
    },
    async resolve(_, { requestUser, requestStatus }, { verifiedUser }){
        if (!verifiedUser) throw new Error("Debes iniciar sesion para realizar esta accion");
        if (verifiedUser.userType !== "admin") throw new Error("Solo un administrador puede actualizar el estado de la solicitud");
        const updated = await Request.findOneAndUpdate(
            requestUser,
            { $set: { requestStatus }},
            { new: true }
        );
        if (!updated) throw new Error("No se pudo actualizar el estado de la solicitud");
        return "¡Estado de la solicitud actualizado exitósamente!";
    }
}

module.exports = {
    addRequest, deleteRequest, updateRequest
}