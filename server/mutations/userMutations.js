// Mongoose Model
const User = require('../models/User');
// GraphQL types
const { GraphQLString, GraphQLList, GraphQLNonNull, GraphQLBoolean } = require('graphql');
// User defined types
const { InputUserCouponType, InputUserPreferenceType, InputUserTripType } = require('../types/typeDefs');
// Utils
const { generateJWToken } = require('../util/auth')
const { encryptPassword, comparePassword } = require('../util/bcrypt')
const nodemailer = require('nodemailer');
require('dotenv').config({ path: '../../.env' })

const login = {
    type: GraphQLString,
    args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) }
    },
    async resolve(_, { email, password }) {
        const user = await User.findOne({ email })
        if (!user) throw new Error("Datos inválidos");
        const validPass = await comparePassword(password, user.password);
        if (!validPass) throw new Error("Datos inválidos");
        const token = generateJWToken({
            _id: user._id,
            email: user.email,
            userType: user.userType
        });
        return user.userType + "%" + user.preferences + "%" + token;
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
        trips: { type: GraphQLList(InputUserTripType) },
        guideDescription: { type: GraphQLString },
        guidePhoto: { type: GraphQLString },
        guideSpecial: { type: GraphQLString },
        guideState: { type: GraphQLBoolean },
    },
    async resolve(_, { name, cellphone, birthDate, email, password, sex, reference, userType, userLevel, membership,
        verified, coupons, preferences, trips, guideDescription, guidePhoto, guideSpecial, guideState }) {
        const user = new User({
            name, cellphone, birthDate, email, password, sex, reference, userType, userLevel, membership,
            verified, coupons, preferences, trips, guideDescription, guidePhoto, guideSpecial, guideState
        });
        if (!name || !cellphone || !birthDate || !email || !password) throw new Error("No deje ningún campo vacío");
        const existsMail = await User.findOne({ email })
        if (existsMail) throw new Error("El correo ya está en uso");
        const existsCell = await User.findOne({ cellphone })
        if (existsCell) throw new Error("El número de teléfono ya está en uso");
        user.password = await encryptPassword(user.password)
        await user.save()
        const token = generateJWToken({
            _id: user._id,
            email: user.email,
            userType: user.userType
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
        return "¡Usuario borrado exitósamente!";
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
        trips: { type: GraphQLList(InputUserTripType) },
        guideDescription: { type: GraphQLString },
        guidePhoto: { type: GraphQLString },
        guideSpecial: { type: GraphQLString },
        guideState: { type: GraphQLBoolean },
    },
    async resolve(_, { name, cellphone, birthDate, email, password, sex, reference, userType, userLevel, membership,
        verified, coupons, preferences, trips, guideDescription, guidePhoto, guideSpecial, guideState }, { verifiedUser }) {
        if (!verifiedUser) throw new Error("Debes iniciar sesion para realizar esta accion");
        if (verifiedUser.userType !== "admin" && verifiedUser.email !== email) throw new Error("No puedes cambiar los datos de otro usuario");
        const newPass = await encryptPassword(password);
        const updated = await User.findOneAndUpdate(
            { email },
            {
                $set: {
                    name, cellphone,
                    birthDate, email,
                    password: newPass,
                    sex, reference,
                    userType, coupons,
                    preferences, userLevel,
                    membership, verified, trips,
                    guideDescription, guidePhoto,
                    guideSpecial, guideState
                }
            },
            { new: true }
        );
        if (!updated) throw new Error("No se pudo actualizar el usuario");
        return "¡Usuario actualizado exitósamente!";
    }
}

const updateUserPassword = {
    type: GraphQLString,
    args: {
        newPassword: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
    },
    async resolve(_, { newPassword, password, email }, { verifiedUser }) {
        let updated = null
        if (!verifiedUser) throw new Error("Debes iniciar sesion para realizar esta accion");
        if (verifiedUser.userType === "admin") {
            const newPass = await encryptPassword(newPassword);
            updated = await User.findOneAndUpdate(
                { email: email },
                { $set: { password: newPass } },
                { new: true }
            )
        } else {
            const user = await User.findOne({ email: verifiedUser.email })
            const validPass = await comparePassword(password, user?.password);
            if (!validPass) throw new Error("Contraseña incorrecta");
            const newPass = await encryptPassword(newPassword);
            updated = await User.findOneAndUpdate(
                { email: verifiedUser.email },
                { $set: { password: newPass } },
                { new: true }
            )
        }
        if (!updated) throw new Error("No se pudo actualizar la contraseña");
        return "¡Contraseña actualizada exitósamente!";
    }
}

const updateUserName = {
    type: GraphQLString,
    args: {
        newName: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
    },
    async resolve(_, { newName, password, email }, { verifiedUser }) {
        let updated = null
        if (!verifiedUser) throw new Error("Debes iniciar sesion para realizar esta accion");
        if (verifiedUser.userType === "admin") {
            updated = await User.findOneAndUpdate(
                { email: email },
                { $set: { name: newName } },
                { new: true }
            )
        } else {
            const user = await User.findOne({ email: verifiedUser.email })
            const validPass = await comparePassword(password, user.password);
            if (!validPass) throw new Error("Contraseña incorrecta");
            updated = await User.findOneAndUpdate(
                { email: verifiedUser.email },
                { $set: { name: newName } },
                { new: true }
            )
        }
        if (!updated) throw new Error("No se pudo actualizar el nombre");
        return "¡Nombre actualizado exitósamente!" + "%" + newName;
    }
}

const updateUserCell = {
    type: GraphQLString,
    args: {
        newCell: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
    },
    async resolve(_, { newCell, password, email }, { verifiedUser }) {
        let updated = null
        if (!verifiedUser) throw new Error("Debes iniciar sesion para realizar esta accion");
        if (verifiedUser.userType === "admin") {
            updated = await User.findOneAndUpdate(
                { email: email },
                { $set: { cellphone: newCell } },
                { new: true }
            )
        } else {
            const user = await User.findOne({ email: verifiedUser.email })
            const validPass = await comparePassword(password, user.password);
            if (!validPass) throw new Error("Contraseña incorrecta");
            updated = await User.findOneAndUpdate(
                { email: verifiedUser.email },
                { $set: { cellphone: newCell } },
                { new: true }
            )
        }
        if (!updated) throw new Error("No se pudo actualizar el número telefónico");
        return "¡Número telefónico actualizado exitósamente!" + "%" + newCell;
    }
}

const updateUserPreferences = {
    type: GraphQLString,
    args: {
        newPref: { type: GraphQLList(InputUserPreferenceType) },
        email: { type: GraphQLString },
    },
    async resolve(_, { newPref, email }, { verifiedUser }) {
        let updated = null
        if (!verifiedUser) throw new Error("Debes iniciar sesion para realizar esta accion");
        if (verifiedUser.userType === "admin") {
            if (!email) throw new Error("Porfavor proporciona un email");
            updated = await User.findOneAndUpdate(
                { email: email },
                { $set: { preferences: newPref } },
                { new: true }
            )
        } else {
            updated = await User.findOneAndUpdate(
                { email: verifiedUser.email },
                { $set: { preferences: newPref } },
                { new: true }
            )
        }
        if (!updated) throw new Error("No se pudieron actualizar las preferencias");
        return "¡Preferencias actualizadas exitósamente!";
    }
}

const updateUserBirth = {
    type: GraphQLString,
    args: {
        newDate: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLString },
    },
    async resolve(_, { newDate, email }, { verifiedUser }) {
        let updated = null
        if (!verifiedUser) throw new Error("Debes iniciar sesion para realizar esta accion");
        if (verifiedUser.userType !== "admin") throw new Error("Solo un administrador puede cambiar la fecha de nacimiento")
        updated = await User.findOneAndUpdate(
            { email: email },
            { $set: { birthDate: newDate } },
            { new: true }
        )
        if (!updated) throw new Error("No se pudo actualizar la fecha de nacimiento");
        return "¡Fecha de nacimiento actualizada exitósamente!" + "%" + newDate;
    }
}
const giveCoupons = {
    type: GraphQLString,
    async resolve(_, __) {
        const users = await User.find({ userType: 'client', userLevel: { $ne: "0" } });
        const currentDate = new Date().toISOString().split("T")[0].split("-").reverse().join("/");
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASS
            }
        });
        const promises = users.map(async (user) => {
            const fecha = user.birthDate.split("/");
            if (fecha[0] === currentDate[0] && fecha[1] === currentDate[1]) {
                const mailOptions = {
                    from: process.env.NODEMAILER_EMAIL,
                    to: user.email,
                    subject: `¡Felíz cumpleaños ${user.name}!`,
                    text: `Debemos hacer un html para el correo`
                };
                const info = await transporter.sendMail(mailOptions);
                const coupon = {
                    couponType: 'birthdayGift',
                    couponDescription: "Este es un regalo por tu cumpleaños",
                    couponAmount: 100,
                    couponDate: currentDate,
                    couponApplied: false
                };
                const updated = await User.findOneAndUpdate(
                    { email: user.email },
                    { $push: { coupons: coupon } },
                    { new: true }
                );
                if (!updated) {
                    throw new Error("No se pudo agregar el cupon");
                }
                return 'Email sent: ' + info.response;
            }
        });
        await Promise.all(promises);
        return "Terminó el proceso de agregado de cupones";
    }
};

module.exports = {
    login, addUser, deleteUser, updateUser,
    updateUserPassword, updateUserName,
    updateUserCell, updateUserPreferences,
    updateUserBirth, giveCoupons
}