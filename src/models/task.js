const validator=require('validator')
const mongoose = require('mongoose');



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
    

});


module.exports=Tasks

