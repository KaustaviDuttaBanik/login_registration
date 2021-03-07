const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        min: 6
    },
    password:{
        type: String,
        required: true,
        min: 6
    },
    firstName:{
        type: String,
        required: true,
        min: 3
    },
    lastName:{
        type: String,
        required: true,
        min: 3
    }
});

module.exports = mongoose.model('User',userSchema);