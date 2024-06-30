const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  user: String,
  email: String,
});

const User = mongoose.model('User', userSchema);

// Define routes for CRUD operations

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.send(user);
});

app.post('/user', async (req, res) => {
  const user = new User(req.body);
  const result = await user.save();
  res.send(result);
});

app.put('/user/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    upsert: true,
  });
  res.send(user);
});

app.delete('/user/:id', async (req, res) => {
  const result = await User.findByIdAndDelete(req.params.id);
  res.send(result);
});

// Start the Express server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
