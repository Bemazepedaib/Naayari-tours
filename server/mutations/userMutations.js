// Mongoose Model
const User = require('../models/User');
// GraphQL types
const { GraphQLString, GraphQLList, GraphQLNonNull, GraphQLBoolean } = require('graphql');
// User defined types
const { UserType, InputUserCouponType, InputUserPreferenceType } = require('../types/typeDefs');
// Utils
const { generateJWToken } = require('../util/auth')
const { encryptPassword, comparePassword } = require('../util/bcrypt')

const login = {
    type: GraphQLString,
    args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) }
    },
    async resolve(_, { email, password }) {
        const user = await User.findOne({ email })
        if (!user) throw new Error("Correo inválido");
        const validPass = await comparePassword(password, user.password);
        if (!validPass) throw new Error("Contraseña inválida");
        const token = generateJWToken({
            _id: user._id,
            email: user.email,
            userType: user.userType,
            userLevel: user.userLevel,
            preferences: user.preferences
        });
        return token;
    }
}

const addUser = {
    type: GraphQLString,
    args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        cellphone: { type: GraphQLNonNull(GraphQLString) },
        birthDate: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        sex: { type: GraphQLNonNull(GraphQLString) },
        reference: { type: GraphQLNonNull(GraphQLString) },
        userType: { type: GraphQLNonNull(GraphQLString) },
        userLevel: { type: GraphQLNonNull(GraphQLString) },
        membership: { type: GraphQLNonNull(GraphQLBoolean) },
        verified: { type: GraphQLNonNull(GraphQLBoolean) },
        coupons: { type: GraphQLList(InputUserCouponType) },
        preferences: { type: GraphQLList(InputUserPreferenceType) },
        guideDescription: { type: GraphQLString },
        guidePhoto: { type: GraphQLString },
        guideSpecial: { type: GraphQLString },
        guideState: { type: GraphQLBoolean },
    },
    async resolve(_, { name, cellphone, birthDate, email, password, sex, reference, userType, userLevel, membership,
            verified, coupons, preferences, guideDescription, guidePhoto, guideSpecial, guideState }) {
        const user = new User({
            name, cellphone, birthDate, email, password, sex, reference, userType,
            userLevel, membership, verified, coupons, preferences, guideDescription, guidePhoto,
            guideSpecial, guideState
        });
        const exists = await User.findOne({ email })
        if (exists) throw new Error("El correo ya está en uso");
        user.password = await encryptPassword(user.password)
        await user.save()
        const token = generateJWToken({
            _id: user._id,
            email: user.email,
            userType: user.userType,
            userLevel: user.userLevel,
            preferences: user.preferences
        });
        return token;
    }
}

const deleteUser = {
    type: GraphQLString,
    args: {
        email: { type: GraphQLNonNull(GraphQLString) }
    },
    async resolve(_, { email }, { verifiedUser }) {
        if (!verifiedUser) throw new Error("Debes iniciar sesion para realizar esta accion");
        if (verifiedUser.userType !== "admin") throw new Error("Solo un administrador puede eliminar usuarios");
        const deleted = await User.findOneAndDelete({ email });
        if (!deleted) throw new Error("No se pudo eliminar el usuario");
        return "Borrado exitósamente";
    }
}

const updateUser = {
    type: GraphQLString,
    args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        cellphone: { type: GraphQLNonNull(GraphQLString) },
        birthDate: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        sex: { type: GraphQLNonNull(GraphQLString) },
        reference: { type: GraphQLNonNull(GraphQLString) },
        userType: { type: GraphQLNonNull(GraphQLString) },
        userLevel: { type: GraphQLNonNull(GraphQLString) },
        membership: { type: GraphQLNonNull(GraphQLBoolean) },
        verified: { type: GraphQLNonNull(GraphQLBoolean) },
        coupons: { type: GraphQLList(InputUserCouponType) },
        preferences: { type: GraphQLList(InputUserPreferenceType) },
        guideDescription: { type: GraphQLString },
        guidePhoto: { type: GraphQLString },
        guideSpecial: { type: GraphQLString },
        guideState: { type: GraphQLBoolean },
    },
    async resolve(_, { name, cellphone, birthDate, email, password, sex, reference, userType, userLevel, membership,
        verified, coupons, preferences, guideDescription, guidePhoto, guideSpecial, guideState }, { verifiedUser }) {
        if (!verifiedUser) throw new Error("Debes iniciar sesion para realizar esta accion");
        const newPass = await encryptPassword(password);
        const updated = User.findOneAndUpdate(
            { email },
            {
                $set: {
                    name, cellphone, birthDate, sex, email, newPass,
                    reference, userType, coupons, preferences,
                    userLevel, membership, verified, guideDescription,
                    guidePhoto, guideSpecial, guideState
                }
            },
            { new: true }
        );
        if (!updated) throw new Error("No se pudo actualizar el usuario");
        return "Actualizado exitósamente";
    }
}

module.exports = {
    login, addUser, deleteUser, updateUser
}