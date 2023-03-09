const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: String,
    name: {
        type: String,    
        required: true,
    },
    cellphone: {
        type: String,    
        required: true,
        unique: true
    },
    birthDate: {
        type: String,    
        required: true,
    },
    email: {
        type: String,    
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    sex: {
        type: String,    
        required: true,
    },
    reference: {
        type: String,    
        required: false,
    },
    userType: {
        type: String,    
        required: true,
        enum: ['admin','guide','client']
    },
    coupons: [{
        couponType: {
            type: String,    
            required: false,
            enum: ['dateChanged','birthdayGift','gift']
        },
        couponDescription: {
            type: String,    
            required: false,
        },
        couponAmount: {
            type: Number,    
            required: false,
        },
        couponDate: {
            type: String,
            required: false
        },
        couponApplied: {
            type: Boolean,
            required: false
        }
    }],
    preferences: [{
        preferenceType: {
            type: String,    
            required: false,
        }
    }],
    userLevel: {
        type: String,    
        required: true,
    },
    membership: {
        type: Boolean,    
        required: true,
    },
    verified: {
        type: Boolean,
        required: true
    },
    guideDescription: {
        type: String,
        required: false
    },
    guidePhoto: {
        type: String,
        required: false
    },
    guideSpecial: {
        type: String,
        required: false
    },
    guideState: {
        type: Boolean,
        required: false,
    }
});

module.exports = mongoose.model('User', UserSchema)