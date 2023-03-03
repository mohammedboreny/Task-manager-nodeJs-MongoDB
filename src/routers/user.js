const express = require('express')
const router = new express.Router()
const User=require('../models/user')
// router.get("/test", (req,res) => {
//     res.send('This is a new router')
// })


// users Post end points
router.post('/users', async (req, res) => {
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
router.get('/users', async (req, res) => {
    
    try {
       const users= await User.find({})
        res.status(201).send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/users/:id', async (req, res) => {
    
    try {
        const user = await User.findById(req.params.id)
        res.status(201).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})


const fillAbleUserInput = (input) => {
    // This piece of code is to insure that the user enters only required fillable keys
   const reqFilled = Object.keys(input)
   const fillAble = ['name', 'email', 'password', 'age']
   const isValid=reqFilled.every((x)=>fillAble.includes(x))
   return isValid
}


router.patch('/users/:id', async (req, res) => {
   // Check fillable function
   const isValid = fillAbleUserInput(req.body)
   if (!isValid) {
     return  res.status(400).send({error:"invalid updates"})
   }
   try {
       const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
       if (!user) {
           return res.status(404).send()
       }
       res.send(user)
   } catch (error) {
       res.status(400).send({error})
   }

})

router.delete('/users/:id', async (req,res) => {
    
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        
        if (!user) {
            return res.status(404).send()
        }
        res.send("user has been deleted")
    } catch (error) {
        res.status(400).send()
    }

})


module.exports = router;