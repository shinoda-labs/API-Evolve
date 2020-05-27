'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/authorize')
const authorize = require('../services/authorize')

router.post('/', controller.authorize)

module.exports = router