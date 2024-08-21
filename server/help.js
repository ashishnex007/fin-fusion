const mongoose = require('mongoose');

const connectDB = () => {
    const dbConnectionString = 'mongodb+srv://ashishgoutham:1rreHoNerSCPQTv4@cluster0.8o1zr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Update with your MongoDB URI
    
    mongoose.connect(dbConnectionString, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
        console.log('Connected to MongoDB');
    });
}

connectDB();

const Customer = require('./models/customerModel');

async function cleanData() {
    try {
        await Customer.updateMany(
            { 
                customer: { $regex: /^'\w+'/ }, // Matches fields starting with a single quote
                age: { $regex: /^''\d+''/ },   // Matches fields with double single quotes around numbers
                gender: { $regex: /^''[MF]''/ },
                zipcodeOri: { $regex: /^''\d+''/ },
                merchant: { $regex: /^''\w+''/ },
                zipMerchant: { $regex: /^''\d+''/ },
                category: { $regex: /^''\w+''/ }
            },
            {
                $set: {
                    customer: { $substr: ['$customer', 1, -2] }, // Removes single quotes
                    age: { $substr: ['$age', 2, -2] },           // Removes double single quotes
                    gender: { $substr: ['$gender', 2, -2] },
                    zipcodeOri: { $substr: ['$zipcodeOri', 2, -2] },
                    merchant: { $substr: ['$merchant', 2, -2] },
                    zipMerchant: { $substr: ['$zipMerchant', 2, -2] },
                    category: { $substr: ['$category', 2, -2] }
                }
            },
            { multi: true }
        );
        console.log('Data cleaned successfully');
    } catch (err) {
        console.error('Error cleaning data:', err);
    }
}

cleanData().then(() => mongoose.disconnect());