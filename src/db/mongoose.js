const validator=require('validator')
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api');


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
const me = new User({
    name: 'Mohammed     ',
    email:"Mhmd@gmail.com     ",
    // age:32
    password:'    password   '
})
me.save().then(() => {
    console.log(me);
}).catch((error) => {
    console.log('Error',error);
})


// Task Model
const Tasks = mongoose.model('Tasks', {
    description: {
        type: String,
        trim: true,
        required:true
    },
    completed: {
        type: Boolean,
        required: false,
        default:false
    }
    ,

});

// const task = new Tasks({
//     description: "This is my 1st Task"
//     ,
//     completed: false
// });


// task.save().then((value) => {
//     console.log(value);
// }).catch((error) => {
//     console.log(error);
// })