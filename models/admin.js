const mongoose = require('mongoose');
const isEmail = require ( 'validator/lib/isEmail')
const Admin = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    branch: {
        type: String
    },
    semester :{
        type: Number
    },
    email: {
        type: String,
        validate: [isEmail,'Invalid email address'],
        required: true,
        unique: true
    },
    password: {
        type: String,
        minLength: 6,
        required: true
    },
    phone: {
        type: Number,
        maxLength: 10,
        minLength: 10,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: 'organiser'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('admin', Admin);
