'use strict'

const ValidationContract = require('../validators/fluent-validator')
const repository = require('../repositories/post')

exports.newPost = async (req, res, next) => {
    let contract = new ValidationContract()
    contract.isRequired(req.body.user, 'Informe o usuário do post.')
    contract.isRequired(req.body.description, 'Informe a descrição do post.')

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end()
        return
    }

    try {
        await repository.newPost(req.body)
        res.status(200).send({ message: 'Post criado com sucesso!' })
    } catch (e) {
        res.status(500).send({ message: 'Falha ao criar o post.', error: e })
    }

}