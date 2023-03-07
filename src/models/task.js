const validator=require('validator')
const mongoose = require('mongoose');
const bcrypt=require('bcrypt')
const taskSchema=new mongoose.Schema( {
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
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    }

})

// taskSchema.pre('save', async function (next) {
//     const task = this
//     console.log("this is middleware ");
    
//     next()
// })

const Tasks = mongoose.model('Tasks',taskSchema);



module.exports=Tasks

