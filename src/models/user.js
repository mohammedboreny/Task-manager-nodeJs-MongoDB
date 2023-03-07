const validator=require('validator')
const mongoose = require('mongoose');
const JWT=require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Task=require('./task.js')
const userSchema= new mongoose.Schema( {
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
        unique:true,
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
    },
   tokens: [{
        token: {
            type: String,
            required:true
        }
    }],
},
{
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
  }
)

//  a relationship between to entity
userSchema.virtual('tasks', {
    ref: 'Tasks',
    // local field i like a primary field, foreignField is like a foreign key
    localField: '_id',
    foreignField:'owner'
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = JWT.sign({ _id: user._id.toString() }, 'thisismynewtoken')
    
    // ! This code is for updating the model token attribute
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}
// schemaName.statics.YourDefinedFunction for user defining function 
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('unable to login')
    }
    const isMatch = bcrypt.compareSync(password, user.password)
    if (!isMatch) {
        throw new Error('unable to login password miss match')
    }
    return user
}


userSchema.pre('save', async function (next) {
    const user = this
    console.log("just before savings!");
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password,8)
    }
    
    next()
})
// Delete user task when user is removed
userSchema.pre('deleteOne', async function (next) {
    const user = this
    await Task.deleteMany({owner:user._id})
    next()
})
const User = mongoose.model('User', userSchema)

module.exports=User