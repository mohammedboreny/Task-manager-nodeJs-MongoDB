const JWT = require('jsonwebtoken')
const bcrypt=require('bcrypt')
const User= require('../models/user')
const auth = async (req, res, next) => {
    try {
        // !to check the header variables of the request 
        const token = req.header('Authorization').replace('Bearer ','')
       console.log(token);
        // ! To check if the header token value match the encryption value
        const decoded = JWT.verify(token, 'thisismynewtoken')
        console.log(decoded);
        // ! to find the users based on their tokens object id and tokens token value 
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

    if (!user) {
        throw new Error()
        }


        // ! To provide user variable and token variables to the route function, So there is no need to fetch it again.
        req.user = user
      
    next()
    } catch (error) {
        res.status(401).send({error:'Authentication is required'})
    }
}

module.exports=auth

// Middleware definition must be before customization of express
// app.use((req,res,next) => {
//     console.log(req.method, req.path);
//     // This will prevent GET Request
//     if (req.method==='GET') {
//         res.send('Get Request is disabled')
//     }
//     else {
//         next()
//     }

//     //! next is going to run the route handler, without it the middleware never stop
//     next()
// })

// app.use((req, res, next) => {
//     res.status(503).send('server is on maintenance')
// })