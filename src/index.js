const express=require('express')
require('./db/mongoose')
const User=require('./models/user')
const app = express();
const port = process.env.PORT || 3000
const Task=require('./models/task')
// Customize the express server
app.use(express.json())


// users Post end points
app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save();
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }

    

    // user.save().then((value) => {
    //     console.log(user);
    //     res.status(201).send('user updated successfully')
    // }).catch((value) => {
    //     res.status(400).send(value)
    // })
}
)

// users Get End Points
app.get('/users', async (req, res) => {
    
    try {
       const users= await User.find({})
        res.status(201).send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.get('/users/:id', async (req, res) => {
    
    try {
        const user = await User.findById(req.params.id)
        res.status(201).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})





// Task endpoints
app.post('/tasks', async (req, res) => {
    const task=new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(502).send(error)
    }

})

// ? Using async/await syntax kills the promises chain
app.get('/tasks/:id', async (req, res) => {
    
    try {
        const task = await Task.findById(req.params.id)
        res.status(201).send(task)
    } catch (error) {
        res.status(402).send(error)
    }

// ? Using the promises chain
    // Task.findById(req.params.id).then((task) => {
    //     res.status(201).send(task)
    // }).catch((value) => {
    //     res.status(500).send()
    // })
})











app.listen(port, () => {
    console.log('Server is up on port '+port);
})
