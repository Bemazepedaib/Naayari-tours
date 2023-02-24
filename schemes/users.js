var mongoose = require('mongoose');
var Scheme = mongoose.Schema;

var usersScheme = new Scheme({
    _id: String,
    name: String,
    cellphone: String,
    birthDate: String,
    email: String,
    sex: String,
    reference: String,
    userType: String,
    coupons : [{
        couponType: String,
        description: String,
        amount: String
    }],
    preferences: [{
        prefType: String
    }],
    userLevel: String,
    membership: String,
    guideDescription: {
        type: String,
        require: false
    },
    guidePhoto: {
        type: String,
        require: false
    },
    guideSpecial: {
        type: String,
        require: false
    },
    guideState: {
        type: String,
        require: false
    }
})

module.exports = mongoose.model('users', usersScheme)