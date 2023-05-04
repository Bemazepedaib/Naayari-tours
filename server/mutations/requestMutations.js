// Mongoose Model
const Request = require('../models/Request');
// GraphQL types
const { GraphQLString, GraphQLNonNull } = require('graphql');

const addRequest = {
    type: GraphQLString,
    args: {
        requestUser: { type: GraphQLNonNull(GraphQLString) },
        requestDate: { type: GraphQLNonNull(GraphQLString) },
        requestTrip: { type: GraphQLNonNull(GraphQLString) },
        requestStatus: { type: GraphQLNonNull(GraphQLString) },
    },
    async resolve(_, { requestUser, requestDate, requestTrip, requestStatus }, { verifiedUser }){
        if (!verifiedUser) throw new Error("Debes iniciar sesion para realizar esta accion");
        const exists = await Request.findOne({ requestUser });
        if (exists) {
            const requests = Request.find({ requestUser })
            console.log(requests)
            throw new Error("No se permiten múltiples solicitudes");
        } else {
            const request = new Request({
                requestUser, requestDate,
                requestTrip, requestStatus
            })
            await request.save();
            return "¡Solicitud creada exitósamente! Espere a que un administrador apruebe la solicitud."
        }        
    }
}

module.exports = {
    addRequest
}