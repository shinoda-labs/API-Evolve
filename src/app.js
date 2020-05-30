'use strict';

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config')

const app = express()

mongoose.connect(config.connectionString, { useNewUrlParser: true })

// Models
const User = require('./models/user')
const Post = require('./models/post')

// Routes
const indexRoute = require('./routes/index')
const userRoute = require('./routes/user')
const authorizeRoute = require('./routes/authorize')
const postRoute = require('./routes/post')

app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
})

app.use('/', indexRoute)
app.use('/authorize', authorizeRoute)
app.use('/user', userRoute)
app.use('/post', postRoute)

module.exports = app;