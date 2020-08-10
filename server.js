const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
var ObjectID = require('mongodb').ObjectID;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const username = 'ArnabRC';
const password = encodeURIComponent('A_RC@kol-90');
const dbName = 'mongoclientbooks';
const collectionName = 'books';
// Connection string for MondoDB Cloud
// const connectionString = `mongodb+srv://${username}:${password}@cluster0-oguj3.mongodb.net/${dbName}?retryWrites=true&w=majority`;
// Connection string for MondoDB Local
const connectionString = `mongodb://localhost:27017/${dbName}`;
const port = 1234;

MongoClient.connect(connectionString, (err, db) => {

    if (err) return console.log(err);

    console.log('Database connected');

    const dbase = db.db(dbName);

    const books = require('./book')(app, dbase, collectionName, ObjectID);

});

app.listen(port, () => {
    console.log(`app working on ${port}`);
});