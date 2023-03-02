const validator=require('validator')
const mongoose = require('mongoose');

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim:true
    },
    password: {
        type: String,
        minlength: 7,
        trim: true,
        required:true,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error('Password cannot contain password')
            }
        }
    },
    email: {
        type: String,
        trim: true,
        lowercase:true,
        required: true
        , validate(value) {
            if (!validator.isEmail(value)) {
                throw new mongoose.Error('email is incorrect')
            }
        }
    },
    age: {
        type: Number,
        default:0,
        validate(value) {
            if (value<0) {
             throw new Error('Age must be a positive number')
            }
        }
    }
})

module.exports=User