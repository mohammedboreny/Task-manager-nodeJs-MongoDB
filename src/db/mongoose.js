const validator=require('validator')
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api');

// User Model



// Task Model


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