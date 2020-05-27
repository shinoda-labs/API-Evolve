'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        trim: true,
    },
    biography: {
        type: String,
        trim: true,
    },
    image: {
        type: String
    },
    permission: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('User', schema)