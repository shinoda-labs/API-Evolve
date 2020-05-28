'use strict'

const mongoose = require('mongoose')
const Post = mongoose.model('Post')

exports.newPost = async (data) => {
    let post = new Post(data)
    await post.save()
}

exports.getPosts = async () => {
    return Post.find({}, 'user description image likes comments shares created_at')
        .populate('user', 'username image')
}

exports.getLikes = async (id) => {
    return Post.findOne({ _id: id }, 'likes').
        populate('likes.user', 'username image')
}

exports.getComments = async (id) => {
    return Post.findOne({ _id: id }, 'comments').
        populate('comments.user', 'username image')
}

exports.getShares = async (id) => {
    return Post.findOne({ _id: id }, 'shares').
        populate('shares.user', 'username image')
}