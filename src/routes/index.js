'use strict'

const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).send({
        title: 'API Evolve',
        version: process.env.TAG || '1.0.0-rc',
        author: 'Shinoda Labs'
    })
})

module.exports = router