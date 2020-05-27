'use strict'

const authorizeService = require('../services/authorize')
const repository = require('../repositories/authorize')
const md5 = require('md5')

exports.authorize = async (req, res, next) => {
    try {
        const user = await repository.authorize({
            username: req.body.username,
            password: md5(req.body.password + global.SALT_KEY)
        })

        if (!user) {
            res.status(404).send({ message: 'Usuário e/ou senha inválido' })
            return
        } else if (user.permission != 'ADMIN') {
            res.status(403).send({ message: 'Usuário sem permissão.' })
            return
        }

        const token = await authorizeService.generateToken({
            id: user._id,
            username: user.username,
            email: user.email
        })

        res.status(201).send({ token: token })
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição', error: e });
    }
}