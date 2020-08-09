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
const connectionString = `mongodb+srv://${username}:${password}@cluster0-oguj3.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const port = 1234;

MongoClient.connect(connectionString, (err, db) => {

    if (err) return console.log(err);

    console.log('Database connected');

    app.listen(port, () => {
        console.log(`app working on ${port}`);
    });

    let dbase = db.db(dbName);

    app.post('/books/create', (req, res, next) => {

        let name = {
            name: req.body.name,
            price: req.body.price
        };

        dbase.collection(collectionName).save(name, (err, result) => {
            if (err) {
                console.log(err);
            }
            res.send('Book added successfully');
        });

    });

    app.get('/books/read', (req, res, next) => {
        dbase.collection(collectionName).find().toArray((err, results) => {
            res.send(results);
        });
    });

    app.get('/books/read/:id', (req, res, next) => {
        if (err) {
            throw err;
        }
        let id = ObjectID(req.params.id);
        dbase.collection(collectionName).find(id).toArray((err, result) => {
            if (err) {
                throw err;
            }
            res.send(result);
        });
    });

    app.put('/books/update/:id', (req, res, next) => {
        var id = {
            _id: new ObjectID(req.params.id)
        };

        dbase.collection(collectionName).update(id, { $set: { name: req.body.name, price: req.body.price } }, (err, result) => {
            if (err) {
                throw err;
            }
            res.send('Book updated sucessfully');
        });
    });

    app.delete('/books/delete/:id', (req, res, next) => {
        let id = ObjectID(req.params.id);

        dbase.collection(collectionName).deleteOne({ _id: id }, (err, result) => {
            if (err) {
                throw err;
            }
            res.send('Book deleted sucessfully');
        });
    });

});