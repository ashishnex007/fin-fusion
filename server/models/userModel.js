const mongoose = require('mongoose');

const userSchema = {
    name: String,
    email: String,
    password: {
        type: String,
        required: true
    }
};

const User = mongoose.model('User', userSchema);