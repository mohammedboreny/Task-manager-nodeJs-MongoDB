
const {MongoClient,ObjectID} = require('mongodb')

const url = "mongodb://0.0.0.0:27017"
const databaseName = 'myProject'


MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
    if (error) {
       return console.log('unable to connect');
    }

    const db = client.db(databaseName)
    console.log('connected');
    // db.collection('users').insertOne(
    //     {
    //         name: 'hasan',
    //         age:22
    //     }
    // )

    // db.collection('users').insertMany([
    //     {
    //         name: "mohammed",
    //         age:28
    //     },
    //     {
    //         name: "mohammed",
    //         age:28

    //     }
    // ], (error, res) => {
    //     if (error) {
    //      return console.log(error);
    //     }
    //     console.log(res.insertedCount);

    // })


    db.collection('tasks').insertMany([
        {description:"description 1",
            complated: false
        },
        {description:"description 1",
        complated: false
    }
        
    ], (error, res) => {
        if (error) {
           return console.log('something went wrong');
        }

        console.log(res.ops);
    })
})