const mongoose = require('mongoose');

const Registeration = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    gender : {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    events: {
        type: Array,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Registeration', Registeration);