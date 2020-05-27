'use strict'

const jwt = require('jsonwebtoken')

exports.generateToken = async (data) => {
    return jwt.sign(data, global.SALT_KEY)
}

exports.decodeToken = async (token) => {
    return await jwt.verify(token, global.SALT_KEY)
}

exports.authorize = function (req, res, next) {
    let token = req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({ message: 'Acesso restrito.' })
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({ message: 'Token inválido.' })
            } else {
                next()
            }
        })
    }
}