'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/user')

router.post('/', controller.createUser)
router.get('/:id', controller.getUserById)
router.patch('/:id', controller.updateUser)

module.exports = router