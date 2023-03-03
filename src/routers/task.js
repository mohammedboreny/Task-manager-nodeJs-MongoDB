const express = require('express')
const router = new express.Router()
const Task=require('../models/task')

// Task endpoints
router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(502).send(error)
    }

})
router.get('/tasks', async (req, res) => {
    

    try {
        const allTask = await Task.find()
        res.status(201).send(allTask)
    } catch (error) {
        res.status(502).send(error)
    }

})

// ? Using async/await syntax kills the promises chain
router.get('/tasks/:id', async (req, res) => {

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


const fillAbleTaskInput = (input) => {
    const reqFilled = Object.keys(input)
    const fillAble = ['description', 'completed']
    const isValid = reqFilled.every((x) => fillAble.includes(x))
    return isValid
}

router.patch('/tasks/:id', async (req, res) => {
    // Check fillable function
    const isValid = fillAbleTaskInput(req.body)
    if (!isValid) {
        return res.status(400).send({ error: "invalid updates" })
    }
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(400).send({ error })
    }

})





router.delete('/tasks/:id', async (req, res) => {
    try {
        const taskOps = await Task.findByIdAndDelete(req.params.id)
        if (!taskOps) {
            return res.status(404).send("We could not find the task with this id:", req.params.id)
        }
        res.send("Task deleted Successfully")
    } catch (error) {
        res.status(500).send()
    }
})



module.exports=router