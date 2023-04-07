const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../../.env' })

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1] || "";
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.verifiedUser = verified.user;
        next();
    } catch (error) {
        next();
    }
}

module.exports = {
    auth,
};