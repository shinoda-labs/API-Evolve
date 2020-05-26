'use strict'

const ValidationContract = require('../validators/fluent-validator')
const repository = require('../repositories/user')
const md5 = require('md5');

exports.post = async (req, res, next) => {
    let contract = new ValidationContract()
    contract.hasMinLen(req.body.username, 5, 'O username deve ter no mínimo 5 caracteres.')
    contract.isEmail(req.body.email, 'E-mail inválido.')
    contract.hasMinLen(req.body.password, 6, 'A senha deve ter no mínimo 6 caracteres.')

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end()
        return
    }

    try {
        const id = await repository.post({
            username: req.body.username,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        })
        res.status(201).send({
            message: 'Usuário criado com sucesso!',
            data: {
                id: id,
                username: req.body.username,
                email: req.body.email
            }
        })
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição', error: e });
    }
}

exports.getById = async (req, res, next) => {
    try {
        res.status(200).send(await repository.getById(req.params.id))
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição', error: e });
    }
}