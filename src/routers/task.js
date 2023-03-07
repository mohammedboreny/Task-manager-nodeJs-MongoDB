const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const auth=require('../middleware/auth')

// Task endpoints
router.post('/tasks', auth,async (req, res) => {

    const task = new Task({
        ...req.body,
        owner:req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(502).send(error)
    }

})
router.get('/tasks',auth, async (req, res) => {
    

    try {
        await req.user.populate('tasks')
        // ?Another Way 
        // const allTask = await Task.find({owner:req.user._id})
        res.status(201).send(req.user.tasks)
    } catch (error) {
        res.status(502).send(error)
    }

})

// ? Using async/await syntax kills the promises chain
router.get('/tasks/:id', auth,async (req, res) => {
    const _id = req.params.id
    // user can fetch the data that he created, else is not going to.
    try {
        
        // const task = await Task.findById(req.params.id)
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()

        }
        res.send(task)
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


const fillAbleTaskInput = (input) => {
   
    return isValid
}

router.patch('/tasks/:id',auth, async (req, res) => {
    const reqFill = Object.keys(req.body)
    const fillAble = ['description', 'completed']
    const isValid = reqFill.every((x) => fillAble.includes(x))
    // Check fillable function
    if (!isValid) {
        return res.status(400).send({ error: "invalid updates" })
    }
    try {
        // find by the owner value
        const task=await Task.findOne({_id:req.params.id,owner:req.user._id})
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body)
       console.log(task);
        if (!task) {
            return res.status(404).send()
        }
        reqFill.forEach((value) => { reqFill[value] = req.body[value] })
      await task.save()
        res.send(task)
    } catch (error) {
        res.status(400).send({ error })
    }

})





router.delete('/tasks/:id',auth, async (req, res) => {
    try {
        const taskOps = await Task.findByIdAndDelete({ _id: req.params.id,owner:req.user._id})
        if (!taskOps) {
            return res.status(404).send(`We could not find the task with this id ${req.params.id}`)
        }
        res.send("Task deleted Successfully")
    } catch (error) {
        res.status(500).send()
    }
})



module.exports=router