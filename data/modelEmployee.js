const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    firstName:{
        type: String,
        required: true,
        min: 3
    },
    lastName:{
        type: String,
        required: true,
        min: 3
    },
    empId:{
        type: Number,
        required: true,
        min: 6
    },
    organizationName:{
        type: String,
        required: true,
        min: 6
    }
});

module.exports = mongoose.model('Employee',employeeSchema);