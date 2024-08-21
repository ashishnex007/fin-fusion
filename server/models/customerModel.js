const mongoose = require('mongoose');

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

const Customer = mongoose.model("Customer", customerSchema, 'customers');

module.exports = {Customer};