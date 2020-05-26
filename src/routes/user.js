'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/user')

router.post('/', controller.post)
router.get('/:id', controller.getById)

module.exports = router