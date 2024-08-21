const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
require('dotenv').config();
const mongoose = require('mongoose');

require('dotenv').config();

const mongoURI = 'mongodb://localhost:27017/new_data';
// mongodb+srv://ashishgoutham:newpassword@cluster0.8o1zr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// *  Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const userRoutes = require('./routes/userRoutes');
const customerRoutes = require('./routes/customerRoutes.js');

// middleware 
app.use(cors());

// connect to DB
// connectDB();

app.get('/', (req, res) => {
  res.send('Hi Mom!');
});

app.use('/api/user', userRoutes);
app.use('/api/customer', customerRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});