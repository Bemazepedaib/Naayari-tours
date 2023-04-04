const jwt = require('jsonwebtoken');
const { JWT_EXPIRES_IN, JWT_SECRET } = require('dotenv').config({ path: '../../.env' })

//Generates a Token
const generateJWToken = (user) => {
    return jwt.sign({ user }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });
};

module.exports = {
    generateJWToken
};