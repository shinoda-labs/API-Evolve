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
const postRoute = require('./routes/post')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', indexRoute)
app.use('/user', userRoute)
app.use('/post', postRoute)

module.exports = app;