'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/user')
const authService = require('../services/authorize')

router.post('/', authService.authorize, controller.createUser)
router.get('/:id', authService.authorize, controller.getUserById)
router.patch('/:id', authService.authorize, controller.updateUser)

module.exports = router