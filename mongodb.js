// CRUD Operation read update delete
const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient



// database connectipn ip
const connectionURL = 'mongodb://127.0.0.1:27017';
// database name
const databaseName = "task-manager";


mongoClient.connect(connectionURL, { useNewUrlParser: true }, (error,client) => {
    if (error) {
        return console.log('unable to connect to database!');
    }
    console.log('Connected to database');

})