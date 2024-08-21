const mongoose = require('mongoose');

// MongoDB URI for local instance
const mongoURI = 'mongodb://localhost:27017/new_data';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define a schema and model for the customers collection
const customerSchema = new mongoose.Schema({
    step: Number,
    customer: String,
    age: String,
    gender: String,
    zipcodeOri: String,
    merchant: String,
    zipMerchant: String,
    category: String,
    amount: Number,
    fraud: Number
}, { strict: false });

const Customer = mongoose.model('Customer', customerSchema, 'customers');

// Retrieve and print the first 5 documents
async function fetchData() {
    try {
        const customers = await Customer.find().limit(5).exec();
        console.log('First 5 documents:', customers);
    } catch (err) {
        console.error('Error retrieving data:', err);
    } finally {
        mongoose.connection.close();
    }
}

fetchData();