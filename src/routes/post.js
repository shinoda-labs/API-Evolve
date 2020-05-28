'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/post')

router.post('/', controller.newPost)

module.exports = router
