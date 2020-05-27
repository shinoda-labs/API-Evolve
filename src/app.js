'use strict';

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config')

const app = express()

mongoose.connect(config.connectionString, { useNewUrlParser: true })

// Models
const User = require('./models/user')

// Routes
const indexRoute = require('./routes/index')
const userRoute = require('./routes/user')
const authorizeRoute = require('./routes/authorize')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', indexRoute)
app.use('/authorize', authorizeRoute)
app.use('/user', userRoute)

module.exports = app;