// record.js
import express from 'express';
import db from '../db/connection.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

// This section will help you create a new record.
router.post('/', async (req, res) => {
  try {
    let newDocument = {
      name: req.body.name,
      author: req.body.author,
      price: req.body.price,
      genre: req.body.genre,
    };
    let collection = await db.collection('books');
    let result = await collection.insertOne(newDocument);
    res.status(201).json(result.ops[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding record');
  }
});

// This section will help you get a list of all the records.
router.get('/', async (req, res) => {
  try {
    let collection = await db.collection('books');
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving records');
  }
});

// This section will help you get a single record by id
router.get('/:id', async (req, res) => {
  try {
    let collection = await db.collection('books');
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.status(404).send('Not found');
    else res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving record');
  }
});

// This section will help you update a record by id.
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send('Missing id parameter');
    }

    const query = { _id: new ObjectId(id) };
    const updates = {
      $set: {
        name: req.body.name,
        author: req.body.author,
        price: req.body.price,
        genre: req.body.genre,
      },
    };

    const collection = db.collection('books');
    const result = await collection.updateOne(query, updates);

    if (result.modifiedCount === 0) {
      return res.status(404).send('Record not found');
    }

    res.status(200).send('Record updated successfully');
  } catch (err) {
    console.error('Error updating record:', err);
    res.status(500).send('Internal Server Error');
  }
});

// This section will help you delete a record
router.delete('/:id', async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection('books');
    let result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      res.status(404).send('Record not found');
    } else {
      res.status(200).send('Record deleted successfully');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting record');
  }
});

export default router;
