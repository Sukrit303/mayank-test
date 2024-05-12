const mongoose = require('mongoose');
const isEmail = require ( 'validator/lib/isEmail')

const Events = new mongoose.Schema({
    eventId: {
        type: Number,
        default: 1
    },
    organiserEmail: {
        type: String,
        validate: [isEmail,'Invalid email address'],
    },
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    title: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    description: {
        type: String,
        maxLength: 370,
        required: true
    },
    studentCordinator: {
        type: Array,
        required: true
    },
    facultyCordinator: {
        type: Object, 
        required: true
    },
    amitianPrice:{   
        type:Number,      
        required: true
    },
    nonAmitianPrice:{   
        type:Number,      
        required: true
    },
    status:{
        type: String,
        default: "pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('event', Events);