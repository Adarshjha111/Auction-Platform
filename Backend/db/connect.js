const mongoose = require('mongoose');
const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const dbURI = process.env.DB_URI;
//const dbURI = 'mongodb://localhost:27017/auctionDB';

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

  // Attach the database connection to the req object
app.use((req, res, next) => {
  req.db = mongoose.connection;
  next();
});

  