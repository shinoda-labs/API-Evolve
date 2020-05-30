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

exports.getPosts = async (req, res, next) => {
    try {
        let posts = await repository.getPosts()
        res.status(200).send({ data: posts, count: posts.length || 0 })
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição', error: e })
    }
}

exports.getLikes = async (req, res, next) => {
    try {
        let likes = await repository.getLikes(req.params.id)
        res.status(200).send({ data: likes, count: likes.length || 0 })
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição', error: e })
    }
}

exports.getComments = async (req, res, next) => {
    try {
        let comments = await repository.getComments(req.params.id)
        res.status(200).send({ data: comments, count: comments.length || 0 })
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição', error: e })
    }
}

exports.getShares = async (req, res, next) => {
    try {
        let shares = await repository.getShares(req.params.id)
        res.status(200).send({ data: shares, count: shares.length || 0 })
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição', error: e })
    }
}

exports.like = async (req, res, next) => {
    let contract = new ValidationContract()
    contract.isRequired(req.body.user, 'Informe o usuário para dar like no post.')

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end()
        return
    }

    try {
        await repository.like(req.params.id, req.body)
        res.status(200).send({ message: 'Post curtido com sucesso.' })
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição', error: e })
    }
}

exports.share = async (req, res, next) => {
    let contract = new ValidationContract()
    contract.isRequired(req.body.user, 'Informe o usuário para compartilhar este post.')

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end()
    }

    try {
        await repository.share(req.params.id, req.body)
        res.status(200).send({ message: 'Post compartilhado com sucesso.' })
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição', error: e })
    }
}

exports.comment = async (req, res, next) => {
    let contract = new ValidationContract()
    contract.isRequired(req.body.description, 'Insira um comentário para comentar o post.')

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end()
    }

    try {
        await repository.comment(req.params.id, req.body)
        res.status(200).send({ message: 'Post comentado com sucesso.' })
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição', error: e })
    }
}