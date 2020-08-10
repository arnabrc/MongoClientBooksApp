module.exports = (app, dbase, collectionName, ObjectID) => {

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
        /* if (err) {
            throw err;
        } */
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
}