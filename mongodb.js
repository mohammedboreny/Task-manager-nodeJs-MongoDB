
const {MongoClient,ObjectID} = require('mongodb')

const url = "mongodb://0.0.0.0:27017"
const databaseName = 'myProject'

// to be able to manipulate the object id value 
// const id = new ObjectID();
// console.log(id.id.length);
// console.log(id.toHexString().length);
// console.log('time stamp of the object id =',id.getTimestamp());


MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
    if (error) {
       return console.log('unable to connect');
    }

    const db = client.db(databaseName)
    console.log('connected');

//   db.collection('users').updateOne({
//         _id: new ObjectID('63ff88744740403df8025d2f')
//   }, {
//         // to change the field to any 
//         $set: {
//             name:"Mike"
//       },
//         // to increment
//       $inc: {
//           age:1
//       }
//     }).then((value) => {
//         console.log(value);
//     }).catch((error) => {
//         console.log(error);
//     })

    db.collection('tasks').updateMany({ complated: false },
        {   
            // update operator
            $set: {
        complated:true
    }}
        ).then((value) => {
            console.log(value);
        }).catch((error) => {
            console.log(error);
        })
 db.collection('users').deleteMany({age:28}).then((value) => {
    console.log(value);
 }).catch((value) => {
    console.log(value);
 })
    
    db.collection('tasks').deleteMany({description:'description 1'})
        .then((value) => {
        console.log(value);
    }).catch((error) => {
        console.log(error);
    })
})