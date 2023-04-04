const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../../.env' })

//Generates a Token
const generateJWToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

module.exports = {
    generateJWToken
};