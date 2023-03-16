
/**
 * address to the database
 */
const dbUri='mongodb://group32:zcsxxgtl@mongodb.l1n.de:27017/group32';

const express = require("express");
const app = express();
const port = 3000;
let mongoose = require('mongoose');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

/**
 * Establishes a connection to the db and saves it into a variable.
 */
let db = mongoose.connection;

db.once('open', () => {
    console.log('DB is connected!');
})

/**
 * Creates a db schema for the terminology items in the database.
 */
let listitemSchema = new mongoose.Schema({
  title: { type: String, unique: false, required: true },
  desc: { type: String, unique: false, required: true },
  chapter: { type: String, unique: false, required: true },
  creator: { type: String, unique: false, required: true }
});

const Listitem = mongoose.model('Listitem', listitemSchema);


/**
 * CRUD operations
 */

// Create
app.post('/item', async (req, res) => {
  try {
    let listitem = new Listitem(req.body);
    let result = await listitem.save();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
})

// Read all items
app.get('/terminologies', async (req, res) => {
  try {
    var result = await Listitem.find().exec();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read a single item by id
app.get('/terminologies/:id', async (req, res) => {
  try {
    let result = await Listitem.findById(req.params.id).exec();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
})

// Update
app.post('/update/:id', async (req, res) => {
  try {
    Listitem.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false }).exec();
  } catch (error) {
    res.status(500).send(error);
  }
})


// Delete
app.delete('/item/:id', async (req, res) => {
  try {
    var result = await Listitem.deleteOne({_id: req.params.id }).exec();
    res.send(result);
  } catch(error) {
    res.status(500).send(error);
  }
});


/**
 * Starts the server at localhost:3000
 */
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

