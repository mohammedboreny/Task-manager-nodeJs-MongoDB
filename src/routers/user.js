const express = require('express')
const router = new express.Router()
const User=require('../models/user')
// router.get("/test", (req,res) => {
//     res.send('This is a new router')
// })
const auth=require('../middleware/auth')

// users Post end points
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})
router.post('/users', auth, async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save();
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})
    router.post('/users/signup', async (req, res) => {
        const user = new User(req.body)
       
        try {
            await user.save();
            const token = await user.generateAuthToken()
            res.send({user, token})
        } catch (error) {
            res.status(400).send(error)
        }
    })
    
    


    router.post('/users/login', async (req, res) => {
        try {
            //? findByCredentials is a user created function
            const user = await User.findByCredentials(req.body.email, req.body.password)
            const token=await user.generateAuthToken()
            res.send({user,token})
        } catch (error) {
            res.status(400).send()
        }
    })


router.post('/users/logout', auth, async (req, res) => {
        
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token===req.token
        })
        await req.user.save()

        res.send()

    } catch (error) {
        res.status(401).send()
    }
})
    

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    }
    catch (error) {
        res.status(500).send()
    }
})

    // user.save().then((value) => {
    //     console.log(user);
    //     res.status(201).send('user updated successfully')
    // }).catch((value) => {
    //     res.status(400).send(value)
    // })

// users Get End Points
router.get('/users', auth ,async (req, res) => {
    
    try {
       const users= await User.find({})
        res.status(201).send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})




router.patch('/users/me', auth  , async (req, res) => {
   // Check fillable function
   const reqFilled = Object.keys(req.body)
   const fillAble = ['name', 'email', 'password', 'age']
   const isValid=reqFilled.every((x)=>fillAble.includes(x))
   if (!isValid) {
     return  res.status(400).send({error:"invalid updates"})
   }
    try {
       reqFilled.forEach((update) => {req.user[update]=req.body[update]})
        await req.user.save()
       res.send(req.user)
   } catch (error) {
       res.status(400).send({error})
   }

})

router.delete('/users/me', auth , async (req , res) => {
    
    try {
       
        await User.deleteOne({ _id: req.user._id });
        res.send(req.user)
    } catch (error) {
        res.status(400).send()
    }

})


module.exports = router;