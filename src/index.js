const express=require('express')
require('./db/mongoose')
const User=require('./models/user')
const app = express();
const port = process.env.PORT || 3000
const Task=require('./models/task')
// Customize the express server
app.use(express.json())


// users Post end points
app.post('/users', (req, res) => {
    const user=new User(req.body)
    user.save().then((value) => {
        console.log(user);
        res.status(201).send('user updated successfully')
    }).catch((value) => {
        res.status(400).send(value)
    })
})

// users Get End Points
app.get('/users', (req,res) => {
    User.find({}).then((user) => {
        res.status(201).send(user)
    }).catch((value) => {
        res.status(500).send()
    })
})
app.get('/users/:id', (req, res) => {
    
    User.findById(req.params.id).then((user) => {
        res.status(201).send(user)
    }).catch((value) => {
        res.status(500).send()
    })
})





// Task endpoints
app.post('/tasks', (req,res) => {
    const task = new Task(req.body)
    task.save().then(() => {
        console.log("Task added successfully");
        res.status(201).send(`Task ${task} \n added successfully`)
    }).catch((error) => {
        res.status(400).send(error)
    })
})
app.get('/tasks/:id', (req, res) => {
    
    Task.findById(req.params.id).then((task) => {
        res.status(201).send(task)
    }).catch((value) => {
        res.status(500).send()
    })
})











app.listen(port, () => {
    console.log('Server is up on port '+port);
})
