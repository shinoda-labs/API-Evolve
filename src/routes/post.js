'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/post')
const authService = require('../services/authorize')

router.post('/', authService.authorize, controller.newPost)
router.get('/', authService.authorize, controller.getPosts)
router.get('/:id/likes', authService.authorize, controller.getLikes)
router.get('/:id/comments', authService.authorize, controller.getComments)
router.get('/:id/shares', authService.authorize, controller.getShares)

module.exports = router
