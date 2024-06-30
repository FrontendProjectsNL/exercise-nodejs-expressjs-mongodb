const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/user');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Define routes for CRUD operations

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send(user);
  } catch (error) {
    res.status(400).send({ message: 'Invalid user ID' });
  }
});

app.post('/user', async (req, res) => {
  try {
    const user = new User(req.body);
    const result = await user.save();
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.put('/user/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      upsert: true,
    });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete('/user/:id', async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send(result);
  } catch (error) {
    res.status(400).send({ message: 'Invalid user ID' });
  }
});

// Start the Express server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
