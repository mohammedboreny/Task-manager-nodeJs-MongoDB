require('../src/db/mongoose')
const Task = require('../src/models/task')


Task.findByIdAndDelete('6400836db6423ee211e8c4c4').then((task) => {
    if (!task) {
        throw new Error('No records found')
    }
    console.log("Task with id:", task.id, "\n has been removed")
    return Task.countDocuments({ completed: false })
}).then((value) => {
    console.log(value);
}).catch((error) => {
    console.log(error);
})