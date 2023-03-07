const express=require('express')
require('./db/mongoose')
const bcrypt=require('bcrypt')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const app = express();
const port = process.env.PORT || 3000





// Customize the express server
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)




    

app.listen(port, () => {
    console.log('Server is up on port '+port);
})


